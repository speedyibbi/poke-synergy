import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { PokemonClient } from 'pokenode-ts';

type Data = {};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const api = new PokemonClient();

	const pokemonSpecies: any = await api
		.listPokemonSpecies(0, -1)
		.then(
			async (data) =>
				await Promise.all(
					data.results.map(
						async (value: any, idx: number) =>
							await api.getPokemonSpeciesById(idx + 1)
					)
				)
		)
		.catch((error) => {
			return {
				error: 'Could not fetch pokemon data',
			};
		});

	if ('error' in pokemonSpecies) return res.json(pokemonSpecies);

	const pokemon = pokemonSpecies.map(
		(species: any, idx: number, array: any) => {
			delete species.flavor_text_entries;
			delete species.form_descriptions;
			delete species.forms_switchable;
			delete species.genera;
			delete species.habitat;
			delete species.is_baby;
			delete species.names;
			delete species.pal_park_encounters;
			delete species.pokedex_numbers;
			delete species.shape;
			species.color = species.color.name;
			species.egg_groups = species.egg_groups.map((group: any) => group.name);
			species.generation = species.generation.name;
			species.growth_rate = species.growth_rate.name;
			species.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${species.id}.png`;
			if (species.evolves_from_species !== null) {
				delete species.evolves_from_species.url;
				species.evolves_from_species.id = array.find(
					(val: any) => val.name === species.evolves_from_species.name
				)!.id;
			}
			species.varieties = species.varieties.map((val: any) => {
				val.pokemon = val.pokemon.name;
				return val;
			});
			return species;
		}
	);

	const runChain = (chain: any) => {
		if (chain.evolves_to.length > 0) {
			for (let i = 0; i < chain.evolves_to.length; i++) {
				runChain(chain.evolves_to[i]);
			}
		}
		if (chain.evolution_details.length > 0) {
			for (let i = 0; i < chain.evolution_details.length; i++) {
				for (const property in chain.evolution_details[i]) {
					if (
						chain.evolution_details[i][property] &&
						chain.evolution_details[i][property].url
					) {
						chain.evolution_details[i][property] =
							chain.evolution_details[i][property].name;
					}
				}
			}
		}
		delete chain.species.url;
		chain.species.id = pokemon.find(
			(mon: any) => mon.name === chain.species.name
		).id;
	};

	const chains: any = await Promise.all(
		pokemon.map(async (mon: any) => await fetch(mon.evolution_chain.url))
	)
		.then((chains) => Promise.all(chains.map((chain) => chain.json())))
		.then((chains) => {
			for (let i = 0; i < pokemon.length; i++) {
				const id = chains[i].id;
				pokemon[i].evolution_chain = id;
			}
			return chains.map((chain: any) => {
				if (chain.baby_trigger_item)
					chain.baby_trigger_item = chain.baby_trigger_item.name;
				runChain(chain.chain);
				return chain;
			});
		})
		.catch((error) => {
			return {
				error: 'Could not fetch chain data',
			};
		});

	const updatedChains = [
		...chains
			.reduce((a: any, c: any) => {
				a.set(c.id, c);
				return a;
			}, new Map())
			.values(),
	];

	fs.writeFile('./pokemon.json', JSON.stringify(pokemon), () => {});
	fs.writeFile('./chains.json', JSON.stringify(updatedChains), () => {});

	res.json({ pokemon, chains });
};

export default handler;

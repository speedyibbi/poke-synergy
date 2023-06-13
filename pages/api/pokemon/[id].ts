import type { NextApiRequest, NextApiResponse } from 'next';
import { PokemonClient, PokemonStat } from 'pokenode-ts';
import Pokemon_type from '@/components/Pokemon/type';

type Data = {
	pokemon: Pokemon_type;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const id = Number(req.query.id);
	const api = new PokemonClient();

	const formatName = (name: string) => {
		if (name === '') return name;
		let formattedName = name[0].toUpperCase();
		for (let i = 1; i < name.length; i++) {
			if (name[i] === '-' && i < name.length - 1) {
				formattedName += name[i] + name[i + 1].toUpperCase();
				i++;
			} else formattedName += name[i];
		}
		return formattedName;
	};

	const formatStats = (stats: PokemonStat[]) => {
		stats.map((stat) => {
			if (stat.stat.name === 'hp') stat.stat.name = 'HP';
			else if (stat.stat.name === 'attack') stat.stat.name = 'Attack';
			else if (stat.stat.name === 'defense') stat.stat.name = 'Defense';
			else if (stat.stat.name === 'special-attack') stat.stat.name = 'Sp. Atk';
			else if (stat.stat.name === 'special-defense') stat.stat.name = 'Sp. Def';
			else if (stat.stat.name === 'speed') stat.stat.name = 'Speed';
		});
		return stats;
	};

	const pokemon: Pokemon_type = await api
		.getPokemonById(id)
		.then((data) => {
			return {
				id: data.id,
				name: formatName(data.name),
				types: data.types,
				abilities: data.abilities,
				stats: formatStats(data.stats),
				image: data.sprites.front_default ? data.sprites.front_default : '',
			};
		})
		.catch((error) => {
			return {
				error: 'Something went wrong',
			};
		});

	res.json({ pokemon });
};

export default handler;

import { GetServerSideProps } from 'next';
import { PokemonClient, PokemonStat } from 'pokenode-ts';
import TeamCard from '@/components/TeamCard';
import Pokemon from '@/components/Pokemon';
import Pokemon_type from '@/components/Pokemon/type';

type Props = {
	pokemon: Pokemon_type;
};

const PokemonListing: React.FC<Props> = (props) => {
	return (
		<>
			<TeamCard />
			<Pokemon pokemon={props.pokemon} />
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const id = Number(context.params!.id);
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

	return { props: { pokemon: pokemon } };
};

export default PokemonListing;

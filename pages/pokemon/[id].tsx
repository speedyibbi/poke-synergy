import { GetServerSideProps } from 'next';
import { PokemonClient } from 'pokenode-ts';
import Pokemon from '@/components/Pokemon';

const PokemonListing: React.FC<any> = (props) => {
	return <Pokemon pokemon={props.pokemon} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const id = Number(context.params!.id);
	const api = new PokemonClient();

	const pokemon = await api
		.getPokemonById(id)
		.then((data) => {
			return {
				id: data.id,
				name: data.name,
				types: data.types,
				abilities: data.abilities,
				stats: data.stats,
				image: data.sprites.front_default,
			};
		})
		.catch((error) => {
			return {
				error,
			};
		});

	return { props: { pokemon } };
};

export default PokemonListing;

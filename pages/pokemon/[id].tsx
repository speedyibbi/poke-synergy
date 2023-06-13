import { GetServerSideProps } from 'next';
import TeamCard from '@/components/TeamCard';
import Pokemon from '@/components/Pokemon';

type Props = {
	id: number;
};

const PokemonListing: React.FC<Props> = (props) => {
	return (
		<>
			<TeamCard />
			<Pokemon id={props.id} />
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const id = Number(context.params!.id);

	return { props: { id } };
};

export default PokemonListing;

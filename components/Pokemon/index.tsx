import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Types from './Types';
import Abilities from './Abilities';
import Stats from './Stats';
import Button from '../Button';
import Loader from '../Loader';
import Pokemon_type from './type';
import { TeamContext } from '@/store/TeamContext';
import styles from './Pokemon.module.css';

type Props = {
	id: number;
};

const Pokemon: React.FC<Props> = (props) => {
	const { addToTeam } = useContext(TeamContext);
	const [pokemon, setPokemon] = useState<Pokemon_type>();
	const router = useRouter();

	const navigationHandler = (jump: number) => {
		if (props.id + jump <= 0) router.push(`/pokemon/${1010}`);
		else if (props.id + jump >= 1010) router.push(`/pokemon/${1}`);
		else router.push(`/pokemon/${props.id + jump}`);
	};

	const teamAdditionHandler = () => {
		addToTeam(pokemon);
	};

	const keypressHandler = (event: any) => {
		if (event.keyCode === 37) navigationHandler(-1);
		else if (event.keyCode === 39) navigationHandler(1);
	};

	useEffect(() => {
		setPokemon(undefined);
		fetch(`/api/pokemon/${props.id}`)
			.then((data) => data.json())
			.then((data) => {
				setPokemon(data.pokemon);
			})
			.catch(() => {
				setPokemon({ error: 'Unable to get Pokemon data' });
			});

		document.addEventListener('keydown', keypressHandler, false);

		return () => {
			document.removeEventListener('keydown', keypressHandler, false);
		};
	}, [props.id]);

	const content = pokemon ? (
		'error' in pokemon ? (
			<p className={`${styles.error}`}>{pokemon.error}</p>
		) : (
			<>
				<Image
					src={pokemon.image}
					alt={pokemon.name}
					width={200}
					height={200}
					className={`${styles.image}`}
					unoptimized
				/>
				<h2 className={`${styles.name}`}>
					{pokemon.name}
					<span className={`${styles.id}`}> #{pokemon.id}</span>
				</h2>
				<Types types={pokemon.types} />
				<Abilities abilities={pokemon.abilities} />
				<Stats stats={pokemon.stats} />
				<Button onClick={teamAdditionHandler} className={`${styles.button}`}>
					Add to Team
				</Button>
			</>
		)
	) : (
		<Loader />
	);

	return (
		<section className={`${styles.listing}`}>
			<svg
				width='43'
				height='25'
				viewBox='0 0 43 25'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				onClick={() => navigationHandler(-1)}
				className={`${styles.prevPokemon} ${styles.navigation}`}
			>
				<path
					d='M19.4068 1.356C19.9703 0.792599 20.7346 0.476097 21.5315 0.476097C22.3284 0.476097 23.0927 0.792599 23.6562 1.356L41.6879 19.3877C42.2353 19.9545 42.5382 20.7136 42.5314 21.5016C42.5245 22.2895 42.2085 23.0433 41.6513 23.6005C41.0941 24.1577 40.3403 24.4738 39.5523 24.4806C38.7644 24.4875 38.0052 24.1845 37.4384 23.6371L21.5315 7.73019L5.62457 23.6371C5.05777 24.1845 4.29863 24.4875 3.51066 24.4806C2.72268 24.4738 1.96892 24.1577 1.41172 23.6005C0.854517 23.0433 0.538455 22.2895 0.531608 21.5016C0.52476 20.7136 0.827677 19.9545 1.37511 19.3877L19.4068 1.356Z'
					fill='white'
				/>
			</svg>
			<article className={`${styles.pokemon}`}>{content}</article>
			<svg
				width='43'
				height='25'
				viewBox='0 0 43 25'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				onClick={() => navigationHandler(1)}
				className={`${styles.nextPokemon} ${styles.navigation}`}
			>
				<path
					d='M19.4068 1.356C19.9703 0.792599 20.7346 0.476097 21.5315 0.476097C22.3284 0.476097 23.0927 0.792599 23.6562 1.356L41.6879 19.3877C42.2353 19.9545 42.5382 20.7136 42.5314 21.5016C42.5245 22.2895 42.2085 23.0433 41.6513 23.6005C41.0941 24.1577 40.3403 24.4738 39.5523 24.4806C38.7644 24.4875 38.0052 24.1845 37.4384 23.6371L21.5315 7.73019L5.62457 23.6371C5.05777 24.1845 4.29863 24.4875 3.51066 24.4806C2.72268 24.4738 1.96892 24.1577 1.41172 23.6005C0.854517 23.0433 0.538455 22.2895 0.531608 21.5016C0.52476 20.7136 0.827677 19.9545 1.37511 19.3877L19.4068 1.356Z'
					fill='white'
				/>
			</svg>
		</section>
	);
};

export default Pokemon;

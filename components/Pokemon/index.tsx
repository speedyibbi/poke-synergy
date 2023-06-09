import { useRouter } from 'next/router';
import Image from 'next/image';
import Abilities from './Abilities';
import styles from './Pokemon.module.css';
import Types from './Types';

const Pokemon: React.FC<any> = (props) => {
	const router = useRouter();

	const navigationHandler = (jump: number) => {
		const id = Number(router.query.id);
		router.push(`/pokemon/${id + jump}`);
	};

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
			<article className={`${styles.pokemon}`}>
				<Image
					src={props.pokemon.image}
					alt={props.pokemon.name}
					width={200}
					height={200}
					className={`${styles.image}`}
					unoptimized
				/>
				<h2 className={`${styles.name}`}>
					{props.pokemon.name[0].toUpperCase() +
						props.pokemon.name
							.slice(1, props.pokemon.name.length)
							.toLowerCase()}
					<span className={`${styles.id}`}> #{props.pokemon.id}</span>
				</h2>
				<Types types={props.pokemon.types} />
				<Abilities abilities={props.pokemon.abilities} />
			</article>
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

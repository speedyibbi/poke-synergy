import Image from 'next/image';
import Pokemon_type from '../../Pokemon/type';
import styles from './TeamMember.module.css';

type Props = {
	pokemon: Pokemon_type | undefined;
	onMouseDown: Function;
	onMouseUp: Function;
};

const TeamMember: React.FC<Props> = (props) => {
	return (
		<>
			{props.pokemon && !('error' in props.pokemon) ? (
				<div className={`${styles.container}`}>
					<Image
						src={props.pokemon.image}
						alt={props.pokemon.name}
						width={100}
						height={100}
						unoptimized
						onMouseDown={() => {
							props.onMouseDown();
						}}
						onMouseUp={() => {
							props.onMouseUp();
						}}
						className={`${styles.pokemon}`}
					/>
					<span className={`${styles.info}`}>
						{props.pokemon.name} #{props.pokemon.id}
					</span>
				</div>
			) : (
				<svg
					width='35'
					height='70'
					viewBox='0 0 38 38'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					className={`${styles.plus}`}
				>
					<path
						d='M19 0C19.6299 0 20.234 0.250223 20.6794 0.695622C21.1248 1.14102 21.375 1.74511 21.375 2.375V16.625H35.625C36.2549 16.625 36.859 16.8752 37.3044 17.3206C37.7498 17.766 38 18.3701 38 19C38 19.6299 37.7498 20.234 37.3044 20.6794C36.859 21.1248 36.2549 21.375 35.625 21.375H21.375V35.625C21.375 36.2549 21.1248 36.859 20.6794 37.3044C20.234 37.7498 19.6299 38 19 38C18.3701 38 17.766 37.7498 17.3206 37.3044C16.8752 36.859 16.625 36.2549 16.625 35.625V21.375H2.375C1.74511 21.375 1.14102 21.1248 0.695622 20.6794C0.250223 20.234 0 19.6299 0 19C0 18.3701 0.250223 17.766 0.695622 17.3206C1.14102 16.8752 1.74511 16.625 2.375 16.625H16.625V2.375C16.625 1.74511 16.8752 1.14102 17.3206 0.695622C17.766 0.250223 18.3701 0 19 0Z'
						fill='white'
					/>
				</svg>
			)}
		</>
	);
};

export default TeamMember;

import Image from 'next/image';
import styles from './Type.module.css';

type Props = {
	name: string;
};

const Type: React.FC<Props> = (props) => {
	const name = props.name.toUpperCase();
	let colorClass = '';

	if (name === 'BUG') colorClass = styles.BUG;
	else if (name === 'DARK') colorClass = styles.DARK;
	else if (name === 'DRAGON') colorClass = styles.DRAGON;
	else if (name === 'ELECTRIC') colorClass = styles.ELECTRIC;
	else if (name === 'FAIRY') colorClass = styles.FAIRY;
	else if (name === 'FIGHT') colorClass = styles.FIGHT;
	else if (name === 'FIRE') colorClass = styles.FIRE;
	else if (name === 'FLYING') colorClass = styles.FLYING;
	else if (name === 'GHOST') colorClass = styles.GHOST;
	else if (name === 'GRASS') colorClass = styles.GRASS;
	else if (name === 'GROUND') colorClass = styles.GROUND;
	else if (name === 'ICE') colorClass = styles.ICE;
	else if (name === 'NORMAL') colorClass = styles.NORMAL;
	else if (name === 'POISON') colorClass = styles.POISON;
	else if (name === 'PSYCHIC') colorClass = styles.PSYCHIC;
	else if (name === 'ROCK') colorClass = styles.ROCK;
	else if (name === 'STEEL') colorClass = styles.STEEL;
	else if (name === 'WATER') colorClass = styles.WATER;

	return (
		<span className={`${styles.type} ${colorClass}`}>
			<Image
				src={`/pokemonTypes/${name.toLowerCase()}.svg`}
				alt={`${name.toLowerCase()} icon`}
				width={15}
				height={15}
				className={`${styles.icon}`}
			/>
			<p className={`${styles.text}`}>
				{name[0] + name.slice(1, name.length).toLowerCase()}
			</p>
		</span>
	);
};

export default Type;

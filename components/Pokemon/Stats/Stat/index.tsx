import styles from './Stat.module.css';

type Props = {
	name: string;
	value: number;
};

const Stat: React.FC<Props> = (props) => {
	let name = '';
	let colorClass = '';

	if (props.name === 'hp') name = 'HP';
	else if (props.name === 'attack') name = 'Attack';
	else if (props.name === 'defense') name = 'Defense';
	else if (props.name === 'special-attack') name = 'Sp. Atk';
	else if (props.name === 'special-defense') name = 'Sp. Def';
	else if (props.name === 'speed') name = 'Speed';

	if (props.value <= 35) colorClass = styles.VERYPOOR;
	else if (props.value > 35 && props.value <= 70) colorClass = styles.POOR;
	else if (props.value > 70 && props.value <= 100) colorClass = styles.AVERAGE;
	else if (props.value > 100 && props.value <= 120) colorClass = styles.GOOD;
	else if (props.value > 120 && props.value <= 150) colorClass = styles.GREAT;
	else if (props.value > 150) colorClass = styles.EXCELLENT;

	return (
		<div className={`${styles.stat}`}>
			<span className={`${styles.key}`}>{name}</span>
			<span className={`${styles.value}`}>{props.value}</span>
			<span
				className={`${styles.bar} ${colorClass}`}
				style={{ width: `${(props.value / 255) * 100}%` }}
			/>
		</div>
	);
};

export default Stat;

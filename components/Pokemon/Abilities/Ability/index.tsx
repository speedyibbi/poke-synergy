import styles from './Ability.module.css';

type Props = {
	name: string;
	hidden: boolean;
};

const Ability: React.FC<Props> = (props) => {
	return (
		<span className={`${styles.ability} ${props.hidden && styles.hidden}`}>
			{props.name[0].toUpperCase() +
				props.name.slice(1, props.name.length).toLowerCase()}
		</span>
	);
};

export default Ability;

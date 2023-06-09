import Ability from './Ability';
import styles from './Abilities.module.css';

type Ability = {
	ability: {
		name: string;
		url: string;
	};
	is_hidden: boolean;
	slot: number;
};

type Props = {
	abilities: Ability[];
};

const Abilities: React.FC<Props> = (props) => {
	return (
		<ul className={`${styles.abilities}`}>
			{props.abilities.map((ability: Ability) => {
				return (
					<li key={ability.ability.name}>
						<Ability name={ability.ability.name} hidden={ability.is_hidden} />
					</li>
				);
			})}
		</ul>
	);
};

export default Abilities;

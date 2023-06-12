import { PokemonAbility } from 'pokenode-ts';
import Ability from './Ability';
import styles from './Abilities.module.css';

type Props = {
	abilities: PokemonAbility[];
};

const Abilities: React.FC<Props> = (props) => {
	const uniqueAbilityIndices = props.abilities
		.map((ability) => JSON.stringify(ability.ability))
		.map((value, index, array) => array.indexOf(value) === index);
	const abilities = props.abilities.filter(
		(value, index) => uniqueAbilityIndices[index]
	);

	return (
		<ul className={`${styles.abilities}`}>
			{abilities.map((ability: PokemonAbility) => {
				return (
					<li key={ability.slot}>
						<Ability name={ability.ability.name} hidden={ability.is_hidden} />
					</li>
				);
			})}
		</ul>
	);
};

export default Abilities;

import { PokemonType } from 'pokenode-ts';
import Type from './Type';
import styles from './Types.module.css';

type Props = {
	types: PokemonType[];
};

const Types: React.FC<Props> = (props) => {
	return (
		<ul className={`${styles.types}`}>
			{props.types.map((type: PokemonType) => {
				return (
					<li key={type.slot}>
						<Type name={type.type.name} />
					</li>
				);
			})}
		</ul>
	);
};

export default Types;

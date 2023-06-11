import Type from './Type';
import styles from './Types.module.css';

type Type = {
	type: {
		name: string;
		url: string;
	};
	slot: number;
};

type Props = {
	types: Type[];
};

const Types: React.FC<Props> = (props) => {
	return (
		<ul className={`${styles.types}`}>
			{props.types.map((type: Type) => {
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

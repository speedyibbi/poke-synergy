import { PokemonStat } from 'pokenode-ts';
import Stat from './Stat';
import styles from './Stats.module.css';

type Props = {
	hide?: boolean;
	stats: PokemonStat[];
};

const Stats: React.FC<Props> = (props) => {
	return (
		<ul className={`${styles.stats} ${props.hide && styles.hidden}`}>
			{props.stats.map((stat: PokemonStat) => {
				return (
					<li key={stat.stat.name}>
						{<Stat name={stat.stat.name} value={stat.base_stat} />}
					</li>
				);
			})}
		</ul>
	);
};

export default Stats;

import { useState } from 'react';
import { PokemonStat } from 'pokenode-ts';
import Stat from './Stat';
import styles from './Stats.module.css';

type Props = {
	stats: PokemonStat[];
};

const Stats: React.FC<Props> = (props) => {
	const [toggle, setToggle] = useState(false);

	const toggleHandler = () => {
		setToggle((state) => !state);
	};

	return (
		<aside onClick={toggleHandler} className={`${styles.container}`}>
			<button className={`${styles.text}`}>View Base Stats</button>
			<svg
				width='41'
				height='25'
				viewBox='0 0 41 25'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				className={`${styles.icon} ${toggle && styles.rotate}`}
			>
				<path
					d='M40.9021 0.117645L20.9021 24.1176L0.9021 0.117645H40.9021Z'
					fill='white'
				/>
			</svg>
			<ul className={`${styles.stats} ${!toggle && styles.hidden}`}>
				{props.stats.map((stat: PokemonStat) => {
					return (
						<li key={stat.stat.name}>
							{<Stat name={stat.stat.name} value={stat.base_stat} />}
						</li>
					);
				})}
			</ul>
		</aside>
	);
};

export default Stats;

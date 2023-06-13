import { useContext } from 'react';
import Trainer from './Trainer';
import TeamMember from './TeamMember';
import Pokemon_type from '../Pokemon/type';
import { TeamContext } from '@/store/TeamContext';
import styles from './Team.module.css';

const TeamCard = () => {
	const { team, selected, select, removeFromTeam } = useContext(TeamContext);
	let timeout: string | number | NodeJS.Timeout | undefined;

	const selectionHandler = (idx: number) => {
		if (selected === idx) select(-1);
		else select(idx);
	};

	const removalHandler = (idx: number, clear: boolean) => {
		if (clear) {
			clearTimeout(timeout);
			return;
		}
		timeout = setTimeout(() => {
			removeFromTeam(idx);
		}, 3000);
	};

	return (
		<section className={`${styles.teamCard}`}>
			<ul className={`${styles.team}`}>
				{team.map((pokemon: Pokemon_type | undefined, idx: number) => {
					return (
						<li
							key={idx}
							onClick={() => selectionHandler(idx)}
							className={`${styles.teamMember} ${
								selected === idx && styles.selected
							}`}
						>
							<TeamMember
								pokemon={pokemon}
								onMouseDown={() => {
									removalHandler(idx, false);
								}}
								onMouseUp={() => {
									removalHandler(idx, true);
								}}
							/>
						</li>
					);
				})}
			</ul>
			<Trainer />
		</section>
	);
};

export default TeamCard;

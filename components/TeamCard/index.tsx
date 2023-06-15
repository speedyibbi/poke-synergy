import { useContext } from 'react';
import Trainer from './Trainer';
import TeamMember from './TeamMember';
import Pokemon_type from '../Pokemon/type';
import { TeamContext } from '@/store/TeamContext';
import styles from './Team.module.css';
import Button from '../Button';

const TeamCard = () => {
	const {
		team,
		selected,
		filledSlots,
		select,
		removeFromTeam,
		generateRandomTeam,
		clearTeam,
	} = useContext(TeamContext);
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

	const generateTeamHandler = () => {
		generateRandomTeam();
	};

	const clearTeamHandler = () => {
		clearTeam();
	};

	return (
		<>
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

				<span className={`${styles.counter}`}>{filledSlots}</span>
			</section>
			<Button onClick={generateTeamHandler}>Generate Team</Button>
			<Button onClick={clearTeamHandler}>Clear Team</Button>
		</>
	);
};

export default TeamCard;

import { createContext, useState } from 'react';
import Pokemon_type from '@/components/Pokemon/type';

type Team = Array<Pokemon_type | undefined>;

type Context = {
	team: Team;
	selected: number;
	filledSlots: number;
	select: Function;
	addToTeam: Function;
	removeFromTeam: Function;
};

export const TeamContext = createContext<Context>({
	team: [],
	selected: -1,
	filledSlots: 0,
	select: () => {},
	addToTeam: (pokemon: Pokemon_type) => {},
	removeFromTeam: (idx: number) => {},
});

type Props = {
	children?: React.ReactNode;
};

const TeamContextProvider: React.FC<Props> = (props) => {
	const [team, setTeam] = useState<Team>([
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
	]);
	const [selected, setSelected] = useState(-1);
	const [filledSlots, setFilledSlots] = useState(0);

	const select = (idx: number) => {
		setSelected(idx);
	};

	const addToTeam = (pokemon: Pokemon_type) => {
		if (!pokemon || 'error' in pokemon) return;

		let emptyTeamIndex = -1;
		let duplicate = false;
		team.forEach((teamMember, idx) => {
			if (
				teamMember &&
				!('error' in teamMember) &&
				teamMember!.id === pokemon.id
			)
				duplicate = true;
			if (!teamMember && emptyTeamIndex === -1) emptyTeamIndex = idx;
		});
		if (duplicate) return;

		const updatedTeam = team;
		if (selected !== -1) {
			if (!updatedTeam[selected] || 'error' in updatedTeam[selected]!) {
				setFilledSlots((state) => {
					return state + 1;
				});
			}
			updatedTeam[selected] = pokemon;
			setTeam([...updatedTeam]);
		} else {
			if (emptyTeamIndex === -1) {
				updatedTeam.pop();
				setTeam([pokemon, ...updatedTeam]);
			} else {
				setTeam([
					pokemon,
					...updatedTeam.slice(0, emptyTeamIndex),
					...updatedTeam.slice(emptyTeamIndex + 1, updatedTeam.length),
				]);
				setFilledSlots((state) => {
					return state + 1;
				});
			}
		}
	};

	const removeFromTeam = (idx: number) => {
		if (idx < 0 || idx > team.length - 1) return;
		const updatedTeam = team;
		updatedTeam[idx] = undefined;
		setTeam([...updatedTeam]);
		setFilledSlots((state) => {
			return state - 1;
		});
	};

	return (
		<TeamContext.Provider
			value={{
				team,
				selected,
				filledSlots,
				select,
				addToTeam,
				removeFromTeam,
			}}
		>
			{props.children}
		</TeamContext.Provider>
	);
};

export default TeamContextProvider;

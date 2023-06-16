import { createContext, useEffect, useState } from 'react';
import Pokemon_type from '@/components/Pokemon/type';

type Team = Array<Pokemon_type | undefined>;

type Context = {
	team: Team;
	selected: number;
	filledSlots: number;
	select: Function;
	addToTeam: Function;
	removeFromTeam: Function;
	generateRandomTeam: Function;
	clearTeam: Function;
};

export const TeamContext = createContext<Context>({
	team: [],
	selected: -1,
	filledSlots: 0,
	select: () => {},
	addToTeam: (pokemon: Pokemon_type) => {},
	removeFromTeam: (idx: number) => {},
	generateRandomTeam: async () => {},
	clearTeam: () => {},
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

	useEffect(() => {
		const updatedTeam = localStorage.getItem('team');
		if (updatedTeam) setTeam([...JSON.parse(updatedTeam)]);
	}, []);

	useEffect(() => {
		localStorage.setItem('team', JSON.stringify(team));
		setFilledSlots(team.length);
	}, [team]);

	const select = (idx: number) => {
		setSelected(idx);
	};

	const addToTeam = (pokemon: Pokemon_type): boolean => {
		if (!pokemon || 'error' in pokemon) return false;

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
		if (duplicate) return false;

		const updatedTeam = [...team];
		if (selected !== -1) {
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
			}
		}

		return true;
	};

	const removeFromTeam = (idx: number): boolean => {
		if (idx < 0 || idx > team.length - 1) return false;

		const updatedTeam = team;
		updatedTeam[idx] = undefined;
		setTeam([...updatedTeam]);

		return true;
	};

	const generateRandomTeam = async (): Promise<boolean> => {
		const excluded = team.map((teamMember) => {
			if (teamMember && !('error' in teamMember)) return teamMember.id;
		});

		const teamSlots = excluded
			.map((id) => {
				if (id) return;
				let newID;
				do {
					newID = Math.floor(Math.random() * (1010 + 1));
				} while (excluded.includes(newID));
				return newID;
			})
			.filter((id) => {
				if (id) return id;
			});

		const teamMembers = await Promise.all(
			teamSlots.map(async (id) => await fetch(`/api/pokemon/${id}`))
		)
			.then((data) => Promise.all(data.map((pokemon) => pokemon.json())))
			.catch((error) => {
				return { error: 'Could not fetch data' };
			});

		if ('error' in teamMembers) return false;

		const updatedTeam = [...team];
		teamMembers.forEach((teamMember) => {
			const idx = updatedTeam.findIndex(
				(pokemon) => !pokemon || 'error' in pokemon
			);
			updatedTeam[idx] = teamMember.pokemon;
		});

		setTeam([...updatedTeam]);

		return true;
	};

	const clearTeam = (): boolean => {
		setTeam([undefined, undefined, undefined, undefined, undefined, undefined]);
		return true;
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
				generateRandomTeam,
				clearTeam,
			}}
		>
			{props.children}
		</TeamContext.Provider>
	);
};

export default TeamContextProvider;

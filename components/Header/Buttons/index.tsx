import { useContext, useState } from 'react';
import Button from '../../Button';
import { TeamContext } from '@/store/TeamContext';

const Buttons = () => {
	const [loading, setLoading] = useState(false);
	const { generateRandomTeam, clearTeam } = useContext(TeamContext);

	const generateTeamHandler = async () => {
		setLoading(true);
		await generateRandomTeam();
		setLoading(false);
	};

	const clearTeamHandler = () => {
		clearTeam();
	};

	return (
		<>
			<Button mini onClick={generateTeamHandler}>
				{loading ? 'Generating...' : 'Generate Team'}
			</Button>
			<Button mini onClick={clearTeamHandler}>
				Clear Team
			</Button>
		</>
	);
};

export default Buttons;

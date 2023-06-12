import { createContext, useState } from 'react';

export const TeamContext = createContext({
	type: '',
	changeHandler: (type: string) => {},
});

type Props = {
	children?: React.ReactNode;
};

const TeamContextProvider: React.FC<Props> = (props) => {
	const [type, setType] = useState('');

	const changeHandler = (type: string) => {
		setType(type);
	};

	return (
		<TeamContext.Provider
			value={{
				type: type,
				changeHandler: changeHandler,
			}}
		>
			{props.children}
		</TeamContext.Provider>
	);
};

export default TeamContextProvider;

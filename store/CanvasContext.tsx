import { createContext, useState } from 'react';

export const CanvasContext = createContext({
	canvasState: 0,
	updateCanvasState: (canvasState: number) => {},
});

type Props = {
	children?: React.ReactNode;
};

const CanvasContextProvider: React.FC<Props> = (props) => {
	const [canvasState, setCanvasState] = useState(0);

	const updateCanvasState = (canvasState: number) => {
		setCanvasState(canvasState);
	};

	return (
		<CanvasContext.Provider
			value={{
				canvasState,
				updateCanvasState,
			}}
		>
			{props.children}
		</CanvasContext.Provider>
	);
};

export default CanvasContextProvider;

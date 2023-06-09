import CanvasContextProvider from '@/store/CanvasContext';
import Header from './Header';
import WebGLCanvas from './WebGLCanvas';

type Props = {
	children?: React.ReactNode;
};

const Layout: React.FC<Props> = (props) => {
	return (
		<>
			<Header />
			<CanvasContextProvider>
				<main>{props.children}</main>
				<WebGLCanvas />
			</CanvasContextProvider>
		</>
	);
};

export default Layout;

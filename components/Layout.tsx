import Header from './Header';
import WebGLCanvas from './WebGLCanvas';
import TeamContextProvider from '@/store/TeamContext';
import Portal from './Portal';

type Props = {
	children?: React.ReactNode;
};

const Layout: React.FC<Props> = (props) => {
	return (
		<>
			<TeamContextProvider>
				<Header />
				<main>{props.children}</main>
			</TeamContextProvider>
			<Portal>
				<WebGLCanvas />
			</Portal>
		</>
	);
};

export default Layout;

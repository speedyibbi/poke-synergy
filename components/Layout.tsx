import Header from './Header';
import WebGLCanvas from './WebGLCanvas';

type Props = {
	children?: React.ReactNode;
};

const Layout: React.FC<Props> = (props) => {
	return (
		<>
			<Header />
			<main>{props.children}</main>
			<WebGLCanvas />
		</>
	);
};

export default Layout;

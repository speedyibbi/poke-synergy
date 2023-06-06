import { Saira } from 'next/font/google';
import WebGLCanvas from './WebGLCanvas';
import Header from './Header';

const saira = Saira({ subsets: ['latin'] });

type Props = {
	children?: React.ReactNode;
};

const Layout: React.FC<Props> = (props) => {
	return (
		<>
			<Header />
			<main className={`${saira.className}`}>{props.children}</main>
			<WebGLCanvas />
		</>
	);
};

export default Layout;

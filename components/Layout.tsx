import { Saira } from 'next/font/google';
import CanvasContextProvider from '@/store/CanvasContext';
import Header from './Header';
import WebGLCanvas from './WebGLCanvas';

const saira = Saira({ subsets: ['latin'] });

type Props = {
	children?: React.ReactNode;
};

const Layout: React.FC<Props> = (props) => {
	return (
		<>
			<Header />
			<CanvasContextProvider>
				<main className={`${saira.className}`}>{props.children}</main>
				<WebGLCanvas />
			</CanvasContextProvider>
		</>
	);
};

export default Layout;

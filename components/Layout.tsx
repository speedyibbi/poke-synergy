import { Saira } from 'next/font/google';
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
		</>
	);
};

export default Layout;

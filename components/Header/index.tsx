import Image from 'next/image';
import { Saira } from 'next/font/google';
import styles from './Header.module.css';

const saira = Saira({ subsets: ['latin'] });

const Header = () => {
	return (
		<header className={`${saira.className}`}>
			<Image
				src='/yveltal.png'
				alt='logo'
				width={140}
				height={116}
				className={`${styles.logo}`}
			/>
		</header>
	);
};

export default Header;

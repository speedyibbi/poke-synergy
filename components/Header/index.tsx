import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './Header.module.css';

const Header = () => {
	const router = useRouter();

	const clickHandler = () => {
		router.push('/');
	};

	return (
		<header>
			<Image
				src='/yveltal.png'
				alt='logo'
				width={140}
				height={116}
				className={`${styles.logo}`}
				onClick={clickHandler}
			/>
		</header>
	);
};

export default Header;

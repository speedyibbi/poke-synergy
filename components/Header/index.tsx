import { useState } from 'react';
import { useRouter } from 'next/router';
import Logo from './Logo';
import Menu from './Menu';
import Buttons from './Buttons';
import styles from './Header.module.css';

const Header = () => {
	const router = useRouter();
	const [toggled, setToggled] = useState(false);

	const clickHandler = () => {
		router.push('/');
	};

	const toggleHandler = () => {
		setToggled((state) => !state);
	};

	return (
		<header className={`${styles.header}`}>
			<Logo onClick={clickHandler} />
			<Menu
				onClick={toggleHandler}
				hide={router.pathname === '/' ? true : false}
			/>
			<aside
				className={`${styles.buttons} ${
					router.pathname === '/' && styles.hidden
				} ${toggled && styles.fullHeight}`}
			>
				<Buttons />
			</aside>
		</header>
	);
};

export default Header;

import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './Header.module.css';
import Button from '../Button';
import { TeamContext } from '@/store/TeamContext';

const Header = () => {
	const router = useRouter();
	const [toggled, setToggled] = useState(false);
	const [loading, setLoading] = useState(false);
	const { generateRandomTeam, clearTeam } = useContext(TeamContext);

	const clickHandler = () => {
		router.push('/');
	};

	const toggleHandler = () => {
		setToggled((state) => !state);
	};

	const generateTeamHandler = async () => {
		setLoading(true);
		await generateRandomTeam();
		setLoading(false);
	};

	const clearTeamHandler = () => {
		clearTeam();
	};

	return (
		<header className={`${styles.header}`}>
			<Image
				src='/yveltal.png'
				alt='logo'
				width={140}
				height={116}
				className={`${styles.logo}`}
				onClick={clickHandler}
			/>
			<aside
				className={`${styles.buttons} ${
					router.pathname === '/' && styles.hidden
				}`}
			>
				<Button mini onClick={generateTeamHandler}>
					{loading ? 'Generating...' : 'Generate Team'}
				</Button>
				<Button mini onClick={clearTeamHandler}>
					Clear Team
				</Button>
			</aside>
			<button
				onClick={toggleHandler}
				className={`${styles.toggle}  ${
					router.pathname === '/' && styles.hidden
				}`}
			>
				<svg
					width='160'
					height='120'
					viewBox='0 0 160 120'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					className={`${styles.menu}`}
				>
					<path
						d='M0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0H150C152.652 0 155.196 1.05357 157.071 2.92893C158.946 4.8043 160 7.34784 160 10C160 12.6522 158.946 15.1957 157.071 17.0711C155.196 18.9464 152.652 20 150 20H10C7.34784 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10ZM39 60C39 57.3478 40.0536 54.8043 41.9289 52.9289C43.8043 51.0536 46.3478 50 49 50H150C152.652 50 155.196 51.0536 157.071 52.9289C158.946 54.8043 160 57.3478 160 60C160 62.6522 158.946 65.1957 157.071 67.0711C155.196 68.9464 152.652 70 150 70H49C46.3478 70 43.8043 68.9464 41.9289 67.0711C40.0536 65.1957 39 62.6522 39 60ZM66 110C66 107.348 67.0536 104.804 68.9289 102.929C70.8043 101.054 73.3478 100 76 100H150C152.652 100 155.196 101.054 157.071 102.929C158.946 104.804 160 107.348 160 110C160 112.652 158.946 115.196 157.071 117.071C155.196 118.946 152.652 120 150 120H76C73.3478 120 70.8043 118.946 68.9289 117.071C67.0536 115.196 66 112.652 66 110Z'
						fill='white'
					/>
				</svg>
			</button>
			<aside
				className={`${styles.toggledButtons} ${toggled && styles.fullHeight}`}
			>
				<Button
					mini
					onClick={generateTeamHandler}
					className={`${styles.toggledButton}`}
				>
					{loading ? 'Generating...' : 'Generate Team'}
				</Button>
				<Button
					mini
					onClick={clearTeamHandler}
					className={`${styles.toggledButton}`}
				>
					Clear Team
				</Button>
			</aside>
		</header>
	);
};

export default Header;

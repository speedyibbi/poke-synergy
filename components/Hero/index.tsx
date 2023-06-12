import { useRouter } from 'next/router';
import Button from '../Button';
import styles from './Hero.module.css';

const Hero = () => {
	const router = useRouter();

	const buttonHandler = () => {
		router.push('/pokemon/1');
	};

	return (
		<section className={`${styles.hero}`}>
			<h1 className={`${styles.heading}`}>
				<span className={`${styles.headingSpan}`}>Poké</span>Synergy
			</h1>
			<p className={`${styles.description}`}>
				Create perfectly balanced teams that dominate battles.
			</p>
			<Button onClick={buttonHandler}>Build Team</Button>
		</section>
	);
};

export default Hero;

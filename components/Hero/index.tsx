import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CanvasContext } from '@/store/CanvasContext';
import Button from '../Button';
import styles from './Hero.module.css';

const Hero = () => {
	const router = useRouter();
	// const { updateCanvasState } = useContext(CanvasContext);

	const buttonHandler = () => {
		// updateCanvasState(1);
		router.push('/pokemon/1');
	};

	// useEffect(() => {
	// 	updateCanvasState(0);
	// }, []);

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

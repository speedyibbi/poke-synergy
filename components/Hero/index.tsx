import Button from '../Button';
import styles from './Hero.module.css';

const Hero = () => {
	return (
		<section className={`${styles.hero}`}>
			<h1 className={`${styles.heading}`}>
				<span className={`${styles.headingSpan}`}>Poké</span>Synergy
			</h1>
			<p className={`${styles.description}`}>
				Create perfectly balanced teams that dominate battles.
			</p>
			<Button>Build Team</Button>
		</section>
	);
};

export default Hero;

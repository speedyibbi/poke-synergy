import Image from 'next/image';
import styles from './Trainer.module.css';

const Trainer = () => {
	return (
		<Image
			src='/red.png'
			alt='trainer'
			width={190}
			height={270}
			className={`${styles.trainer}`}
		/>
	);
};

export default Trainer;

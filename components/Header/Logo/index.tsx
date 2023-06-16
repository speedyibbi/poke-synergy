import Image from 'next/image';
import styles from './Logo.module.css';

type Props = {
	onClick?: Function;
};

const Logo: React.FC<Props> = (props) => {
	return (
		<>
			<Image
				src='/yveltal.png'
				alt='logo'
				width={140}
				height={116}
				onClick={() => {
					props.onClick && props.onClick();
				}}
				className={`${styles.logo}`}
			/>
		</>
	);
};

export default Logo;

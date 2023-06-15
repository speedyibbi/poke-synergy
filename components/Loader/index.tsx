import styles from './Loader.module.css';

type Props = {
	className?: string;
};

const Loader: React.FC<Props> = (props) => {
	return <span className={`${styles.loader} ${props.className}`} />;
};

export default Loader;

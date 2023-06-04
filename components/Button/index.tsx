import styles from './Button.module.css';

type Props = {
	onClick?: Function;
	children?: React.ReactNode;
};

const Button: React.FC<Props> = (props) => {
	const buttonClickHandler = () => {
		if (props.onClick) props.onClick();
	};

	return (
		<>
			<button onClick={buttonClickHandler} className={`${styles.button}`}>
				{props.children}
			</button>
		</>
	);
};

export default Button;

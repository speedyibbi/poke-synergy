import styles from './Button.module.css';

type Props = {
	mini?: boolean;
	onClick?: Function;
	className?: string;
	children?: React.ReactNode;
};

const Button: React.FC<Props> = (props) => {
	const buttonClickHandler = () => {
		if (props.onClick) props.onClick();
	};

	return (
		<>
			<button
				onClick={buttonClickHandler}
				className={`${!props.mini ? styles.button : styles.mini} ${
					props.className
				}`}
			>
				{props.children}
			</button>
		</>
	);
};

export default Button;

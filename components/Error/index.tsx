import { useRouter } from 'next/router';
import Button from '../Button';
import styles from './Error.module.css';

const Error = () => {
	const router = useRouter();

	const buttonHandler = () => {
		router.push('/');
	};

	return (
		<section className={`${styles.error}`}>
			<p>Page not found</p>
			<Button onClick={buttonHandler}>Return Home</Button>
		</section>
	);
};

export default Error;

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

type Props = {
	children?: React.ReactNode;
};

const Portal: React.FC<Props> = (props) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);

		return () => setMounted(false);
	}, []);

	return mounted
		? createPortal(props.children, document.getElementById('portal')!)
		: null;
};

export default Portal;

import { useNavigate } from 'react-router-dom';

const Error = ({ children }) => {
	const navigate = useNavigate();

	return (
		<>
			<h3>{children}</h3>
			<button onClick={() => navigate(-1)}>Volver</button>
		</>
	);
};

export default Error;

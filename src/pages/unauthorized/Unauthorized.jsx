import { useNavigate } from 'react-router-dom';

const Unauthorized = ({ children }) => {
	const navigate = useNavigate();

	return (
		<>
			<h2>{children}</h2>
			<button onClick={() => navigate(-1)}>Volver</button>
		</>
	);
};

export default Unauthorized;

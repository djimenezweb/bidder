import { useNavigate } from 'react-router-dom';

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<>
			<h2>Página no encontrada</h2>
			<button onClick={() => navigate(-1)}>Volver</button>
		</>
	);
};

export default NotFound;

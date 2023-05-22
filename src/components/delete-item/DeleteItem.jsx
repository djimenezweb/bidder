import { deleteDoc, doc } from 'firebase/firestore';
import { itemsDB } from '../../config/firebase.config';
import { useNavigate } from 'react-router-dom';

const DeleteItem = ({ itemId }) => {
	const navigate = useNavigate();
	return (
		<button onClick={() => handleDelete(itemId, navigate)}>
			Borrar anuncio
		</button>
	);
};

const handleDelete = async (id, navigate) => {
	try {
		const itemToDelete = doc(itemsDB, id);
		await deleteDoc(itemToDelete);
		navigate('/');
	} catch (err) {
		console.error('Error al borrar el documento:', err);
	}
};

export default DeleteItem;

import { deleteDoc, doc } from 'firebase/firestore';
import { itemsDB, storage } from '../../config/firebase.config';
import { useNavigate } from 'react-router-dom';
import { deleteObject, ref } from 'firebase/storage';

const DeleteItem = ({ itemId, picturesArray }) => {
	const navigate = useNavigate();
	return (
		<button onClick={() => handleDelete(itemId, picturesArray, navigate)}>
			Borrar anuncio
		</button>
	);
};

const handleDelete = async (id, picturesArray, navigate) => {
	try {
		const itemToDelete = doc(itemsDB, id);

		// Borrar fotos
		await picturesArray.forEach(picture => {
			const fileToDelete = ref(storage, picture);
			deleteObject(fileToDelete);
		});

		// Borrar anuncio
		await deleteDoc(itemToDelete);

		// Redirigir a Home
		navigate('/');
	} catch (err) {
		console.error('Error al borrar el documento:', err);
	}
};

export default DeleteItem;

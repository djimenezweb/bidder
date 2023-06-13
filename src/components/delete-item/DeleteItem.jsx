import { deleteDoc, doc } from 'firebase/firestore';
import { itemsDB, storage } from '../../config/firebase.config';
import { useNavigate } from 'react-router-dom';
import { deleteObject, ref } from 'firebase/storage';
import { MESSAGES } from '../../constants/messages';
import {
	StyledButtonContainer,
	StyledCancelButton,
	StyledDeleteButton
} from '../modal/styles';

const DeleteItem = ({ itemId, picturesArray, setModalContent }) => {
	const navigate = useNavigate();
	return (
		<>
			<p>{MESSAGES.deleteWarning}</p>
			<p>{MESSAGES.irreversible}</p>
			<StyledButtonContainer>
				<StyledCancelButton onClick={() => setModalContent(null)}>
					{MESSAGES.cancel}
				</StyledCancelButton>
				<StyledDeleteButton
					onClick={() => handleDelete(itemId, picturesArray, navigate)}
				>
					{MESSAGES.removeItem}
				</StyledDeleteButton>
			</StyledButtonContainer>
		</>
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

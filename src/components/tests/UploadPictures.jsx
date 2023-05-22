import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytes
} from 'firebase/storage';
import { storage } from '../../config/firebase.config';
import { v4 } from 'uuid';
import { useContext, useRef } from 'react';
import { AuthContext } from '../../contexts/Auth.context';

const UploadPictures = ({ newItem, setNewItem }) => {
	const { loggedUser } = useContext(AuthContext);
	const inputPicture0Ref = useRef(null);
	const inputPicture1Ref = useRef(null);
	const inputPicture2Ref = useRef(null);

	return (
		<div>
			<input
				style={{ display: 'none' }}
				type='file'
				name='picture0'
				id='picture0'
				ref={inputPicture0Ref}
				onChange={e =>
					handleLoadFile(e.target, loggedUser, newItem, setNewItem)
				}
			/>
			<div onClick={() => handleClick(inputPicture0Ref)}>++++AÑADIR++++</div>
			<img
				src={newItem?.picture0}
				alt=''
				onClick={() => handleDeleteFile('picture0', newItem, setNewItem)}
			/>

			<input
				style={{ display: 'none' }}
				type='file'
				name='picture1'
				id='picture1'
				ref={inputPicture1Ref}
				onChange={e =>
					handleLoadFile(e.target, loggedUser, newItem, setNewItem)
				}
			/>
			<div onClick={() => handleClick(inputPicture1Ref)}>++++AÑADIR++++</div>
			<img
				src={newItem?.picture1}
				alt=''
				onClick={() => handleDeleteFile('picture1', newItem, setNewItem)}
			/>
			<input
				style={{ display: 'none' }}
				type='file'
				name='picture2'
				id='picture2'
				ref={inputPicture2Ref}
				onChange={e =>
					handleLoadFile(e.target, loggedUser, newItem, setNewItem)
				}
			/>
			<div onClick={() => handleClick(inputPicture2Ref)}>++++AÑADIR++++</div>
			<img
				src={newItem?.picture2}
				alt=''
				onClick={() => handleDeleteFile('picture2', newItem, setNewItem)}
			/>
		</div>
	);
};

const handleDeleteFile = async (pictureNumber, newItem, setNewItem) => {
	const storageRef = ref(storage, newItem[pictureNumber]);
	try {
		await deleteObject(storageRef);
		setNewItem({ ...newItem, [pictureNumber]: null });
		console.log('Archivo eliminado correctamente');
	} catch (err) {
		console.error('Error al eliminar el archivo:', err);
	}
};

const handleLoadFile = async (target, loggedUser, newItem, setNewItem) => {
	const pictureNumber = target.id;
	const finalName = `${pictureNumber}-${v4()}`;
	const directory = loggedUser.email;
	const storageRef = ref(storage, `${directory}/${finalName}`);

	try {
		await uploadBytes(storageRef, target.files[0]);
		const imageURL = await getDownloadURL(storageRef);
		setNewItem({ ...newItem, [pictureNumber]: imageURL });
	} catch (err) {
		console.error('Error al subir el archivo:', err);
	}
};

const handleClick = inputRef => inputRef.current.click();

export default UploadPictures;

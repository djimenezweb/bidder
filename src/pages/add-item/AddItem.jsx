import { useContext, useState } from 'react';

// Firebase
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../config/firebase.config';
import { AuthContext } from '../../contexts/Auth.context';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

// Components
import UploadPictures from '../../components/upload-pictures/UploadPictures';

const AddItem = () => {
	const INITIAL_STATE = {
		title: '',
		startingPrice: 1,
		duration: 1,
		description: ''
	};

	const INITIAL_PREVIEW = {
		picture0: '',
		picture1: '',
		picture2: ''
	};

	const { loggedUser } = useContext(AuthContext);
	const [newItem, setNewItem] = useState(INITIAL_STATE);
	const [preview, setPreview] = useState(INITIAL_PREVIEW);

	return (
		<>
			<h2>Crear anuncio</h2>
			<form
				onSubmit={e =>
					handleSubmit(
						e,
						newItem,
						loggedUser,
						setNewItem,
						INITIAL_STATE,
						setPreview,
						INITIAL_PREVIEW
					)
				}
			>
				<div>
					<label htmlFor='title'>Título</label>
					<input
						type='text'
						name='title'
						id='title'
						value={newItem.title}
						onChange={e =>
							handleChange(newItem, setNewItem, 'title', e.target.value)
						}
					/>
				</div>
				<div>
					<label htmlFor='startingPrice'>Precio de salida</label>
					<input
						type='number'
						name='startingPrice'
						id='startingPrice'
						value={newItem.startingPrice}
						onChange={e =>
							handleChange(newItem, setNewItem, 'startingPrice', e.target.value)
						}
					/>{' '}
					€
				</div>
				<div>
					<label htmlFor='duration'>Duración</label>
					<select
						name='duration'
						id='duration'
						value={newItem.duration}
						onChange={e =>
							handleChange(newItem, setNewItem, 'duration', e.target.value)
						}
					>
						<option value='1'>1 día</option>
						<option value='3'>3 días</option>
						<option value='5'>5 días</option>
						<option value='7'>1 semana</option>
					</select>
					<p>
						La subasta terminará el {printDate(newItem.duration)} a las{' '}
						{printTime()}
					</p>
				</div>
				<div>
					<label htmlFor='description'>Descripción</label>
					<textarea
						name='description'
						id='description'
						value={newItem.description}
						onChange={e =>
							handleChange(newItem, setNewItem, 'description', e.target.value)
						}
					></textarea>
				</div>

				<UploadPictures preview={preview} setPreview={setPreview} />

				<div>
					<button type='reset' onClick={() => setNewItem(INITIAL_STATE)}>
						Borrar
					</button>
					<button>Publicar anuncio</button>
				</div>
			</form>
		</>
	);
};

export default AddItem;

const handleChange = (newItem, setNewItem, key, value) => {
	setNewItem({
		...newItem,
		[key]: value
	});
};

const handleSubmit = async (
	e,
	newItem,
	loggedUser,
	setNewItem,
	INITIAL_STATE,
	setPreview,
	INITIAL_PREVIEW
) => {
	e.preventDefault();
	const id = v4();

	const storageRef0 = ref(storage, `${loggedUser.email}/${id}/picture0`);
	const storageRef1 = ref(storage, `${loggedUser.email}/${id}/picture1`);
	const storageRef2 = ref(storage, `${loggedUser.email}/${id}/picture2`);

	const today = new Date();
	const endDate = new Date();
	endDate.setDate(endDate.getDate() + Number(newItem.duration));
	const userToUpdate = doc(db, 'users', loggedUser.email);
	try {
		await uploadBytes(storageRef0, e.target.picture0.files[0]);
		const picture0URL = await getDownloadURL(storageRef0);

		await uploadBytes(storageRef1, e.target.picture1.files[0]);
		const picture1URL = await getDownloadURL(storageRef1);

		await uploadBytes(storageRef2, e.target.picture2.files[0]);
		const picture2URL = await getDownloadURL(storageRef2);

		await setDoc(doc(db, 'items', id), {
			...newItem,
			sellerEmail: loggedUser.email,
			sellerID: loggedUser.uid,
			currentPrice: newItem.startingPrice,
			highestBid: 0,
			highestBidder: '',
			creationDate: today.toISOString(),
			endDate: endDate.toISOString(),
			pictures: [picture0URL, picture1URL, picture2URL]
		});
		await updateDoc(userToUpdate, { myItems: arrayUnion(id) });
		setNewItem(INITIAL_STATE);
		setPreview(INITIAL_PREVIEW);
	} catch (err) {
		console.error(err);
	}
};

const printDate = duration => {
	const dateToPrint = new Date();
	dateToPrint.setDate(dateToPrint.getDate() + Number(duration));
	return dateToPrint.toLocaleDateString('es-ES', { dateStyle: 'full' });
};

const printTime = duration => {
	const timeToPrint = new Date();
	return timeToPrint.toLocaleTimeString('es-ES', {
		timeStyle: 'short'
	});
};

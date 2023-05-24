import { useContext, useState } from 'react';

// Firebase
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../config/firebase.config';
import { AuthContext } from '../../contexts/Auth.context';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

// Components
import UploadPictures from '../../components/upload-pictures/UploadPictures';
import { DURATION } from '../../constants/add-item';

const AddItem = () => {
	const INITIAL_STATE = {
		title: '',
		startingPrice: 1,
		duration: 1,
		description: ''
	};

	const { loggedUser } = useContext(AuthContext);
	const [newItem, setNewItem] = useState(INITIAL_STATE);
	const [pictures, setPictures] = useState([]);

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
						pictures,
						setPictures
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
						{DURATION.map(option => {
							return (
								<option key={option.id} value={option.value}>
									{option.option}
								</option>
							);
						})}
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

				<UploadPictures pictures={pictures} setPictures={setPictures} />

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
	pictures,
	setPictures
) => {
	e.preventDefault();
	const id = v4();
	const today = new Date();
	const endDate = new Date();
	endDate.setDate(endDate.getDate() + Number(newItem.duration));
	const userToUpdate = doc(db, 'users', loggedUser.email);
	const picturesURLS = [];

	try {
		pictures.forEach(async (picture, index) => {
			const storageRef = ref(
				storage,
				`${loggedUser.email}/${id}/picture${index}`
			);
			await uploadBytes(storageRef, picture);
			// await uploadString(storageRef, picture);
			const pictureURL = await getDownloadURL(storageRef);
			console.log('URL: ' + pictureURL);
			picturesURLS.push(pictureURL);
		});

		console.log('Array de urls: ' + picturesURLS);

		await setDoc(doc(db, 'items', id), {
			...newItem,
			sellerEmail: loggedUser.email,
			sellerID: loggedUser.uid,
			currentPrice: newItem.startingPrice,
			highestBid: 0,
			highestBidder: '',
			creationDate: today.toISOString(),
			endDate: endDate.toISOString(),
			pictures: picturesURLS
		});
		await updateDoc(userToUpdate, { myItems: arrayUnion(id) });
		setNewItem(INITIAL_STATE);
		setPictures([]);
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

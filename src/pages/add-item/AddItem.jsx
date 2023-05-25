import { useContext, useState } from 'react';
import UploadPictures from '../../components/upload-pictures/UploadPictures';
import { DURATION } from '../../constants/add-item';
import Button from '../../components/button/Button';

// Firebase
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../config/firebase.config';
import { AuthContext } from '../../contexts/Auth.context';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
	console.log('AddItem renderizado');

	const navigate = useNavigate();

	const INITIAL_STATE = {
		title: '',
		startingPrice: 1,
		duration: 1,
		description: ''
	};

	const { loggedUser } = useContext(AuthContext);
	const [formData, setFormData] = useState(INITIAL_STATE);
	const [pictures, setPictures] = useState([]);
	const [errors, setErrors] = useState({
		title: false,
		startingPrice: false,
		description: false,
		pictures: false
	});

	console.log(errors);

	return (
		<>
			<h2>Crear anuncio</h2>
			<form
				onSubmit={e =>
					handleSubmit(
						e,
						formData,
						loggedUser,
						setFormData,
						INITIAL_STATE,
						pictures,
						setPictures,
						errors,
						setErrors,
						navigate
					)
				}
			>
				<div>
					<label htmlFor='title'>Título</label>
					<input
						type='text'
						name='title'
						id='title'
						value={formData.title}
						onChange={e =>
							handleChange(formData, setFormData, 'title', e.target.value)
						}
					/>
					{errors.title && <p>Campo requerido</p>}
				</div>
				<div>
					<label htmlFor='startingPrice'>Precio de salida</label>
					<input
						type='number'
						name='startingPrice'
						id='startingPrice'
						value={formData.startingPrice}
						onChange={e =>
							handleChange(
								formData,
								setFormData,
								'startingPrice',
								e.target.value
							)
						}
					/>{' '}
					€
					{errors.startingPrice && (
						<p>
							Introduce un número válido. El precio debe ser mayor o igual a 1€.
						</p>
					)}
				</div>
				<div>
					<label htmlFor='duration'>Duración</label>
					<select
						name='duration'
						id='duration'
						value={formData.duration}
						onChange={e =>
							handleChange(formData, setFormData, 'duration', e.target.value)
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
						La subasta terminará el {printDate(formData.duration)} a las{' '}
						{printTime()}
					</p>
				</div>
				<div>
					<label htmlFor='description'>Descripción</label>
					<textarea
						name='description'
						id='description'
						value={formData.description}
						onChange={e =>
							handleChange(formData, setFormData, 'description', e.target.value)
						}
					></textarea>
					{errors.description && <p>Campo requerido</p>}
				</div>

				<UploadPictures
					pictures={pictures}
					setPictures={setPictures}
					errors={errors}
				/>

				<div>
					<Button action={() => setFormData(INITIAL_STATE)}>Borrar</Button>
					<Button>Publicar anuncio</Button>
				</div>
			</form>
		</>
	);
};

export default AddItem;

const handleChange = (formData, setFormData, key, value) => {
	setFormData({
		...formData,
		[key]: value
	});
};

const validateForm = (formData, pictures, errors, setErrors) => {
	console.log('title', formData.title);
	if (formData.length === 0) {
		setErrors({ ...errors, title: true });
	}

	console.log('price', formData.startingPrice);

	if (formData.startingPrice < 1) {
		setErrors({ ...errors, startingPrice: true });
	}

	console.log('description', formData.description);
	if (formData.description === '') {
		setErrors({ ...errors, description: true });
	}

	if (pictures.length === 0) {
		setErrors({ ...errors, pictures: true });
	}
};

const handleSubmit = async (
	e,
	formData,
	loggedUser,
	setFormData,
	INITIAL_STATE,
	pictures,
	setPictures,
	errors,
	setErrors,
	navigate
) => {
	e.preventDefault();

	// Validar formulario
	validateForm(formData, pictures, errors, setErrors);

	/* const id = v4();
	const today = new Date();
	const endDate = new Date();
	endDate.setDate(endDate.getDate() + Number(formData.duration));
	const userToUpdate = doc(db, 'users', loggedUser.email);

	try {
		const allUrls = [];
		await Promise.all(
			pictures.map(async (picture, index) => {
				const storageRef = ref(
					storage,
					`${loggedUser.email}/${id}/picture${index}`
				);
				await uploadBytes(storageRef, picture);
				const pictureURL = await getDownloadURL(storageRef);
				console.log(`URL picture${index}: ${pictureURL}`);
				allUrls.push(pictureURL);
			})
		);

		console.log('allUrls: ', allUrls);

		await setDoc(doc(db, 'items', id), {
			...formData,
			sellerEmail: loggedUser.email,
			sellerID: loggedUser.uid,
			currentPrice: formData.startingPrice,
			highestBid: 0,
			highestBidder: '',
			creationDate: today.toISOString(),
			endDate: endDate.toISOString(),
			pictures: allUrls
		});
		await updateDoc(userToUpdate, { myItems: arrayUnion(id) });
		setFormData(INITIAL_STATE);
		setPictures([]);
		// navigate(`/itm/${id}`);
	} catch (err) {
		console.error(err);
	} */
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

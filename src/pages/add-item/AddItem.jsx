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
	const [errors, setErrors] = useState({});

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
					{<p>{errors?.title}</p>}
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
					€{<p>{errors?.startingPrice}</p>}
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
					{<p>{errors?.description}</p>}
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

const validateForm = (formData, pictures) => {
	const errorMessages = {};
	if (formData.title === '') errorMessages.title = 'Campo requerido';
	if (formData.startingPrice < 1)
		errorMessages.startingPrice =
			'Introduce un número válido. El precio debe ser igual o mayor que 1€.';
	if (formData.description === '')
		errorMessages.description = 'Campo requerido';
	if (pictures.length === 0)
		errorMessages.pictures = 'Es necesario subir al menos 1 foto';
	return Object.keys(errorMessages).length === 0 ? null : errorMessages;
};

const handleSubmit = async (
	e,
	formData,
	loggedUser,
	setFormData,
	INITIAL_STATE,
	pictures,
	setPictures,
	setErrors,
	navigate
) => {
	e.preventDefault();

	// Validar formulario
	const invalidFields = validateForm(formData, pictures);
	setErrors({ ...invalidFields });
	if (invalidFields) return;

	// Formulario sin errores. Declaración de constantes:
	const id = v4();
	const today = new Date();
	const endDate = new Date();
	endDate.setDate(endDate.getDate() + Number(formData.duration));
	const userToUpdate = doc(db, 'users', loggedUser.email);

	try {
		// Enviar fotos
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

		// Enviar datos formulario
		await setDoc(doc(db, 'items', id), {
			...formData,
			id,
			sellerEmail: loggedUser.email,
			sellerID: loggedUser.uid,
			currentPrice: formData.startingPrice,
			highestBid: 0,
			highestBidder: '',
			bids: 0,
			creationDate: today.toISOString(),
			endDate: endDate.toISOString(),
			pictures: allUrls
		});
		await updateDoc(userToUpdate, { myItems: arrayUnion(id) });

		// Resetear formulario y redireccionar
		setFormData(INITIAL_STATE);
		setPictures([]);
		navigate(`/itm/${id}`);
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

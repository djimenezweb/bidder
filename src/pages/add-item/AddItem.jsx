import { useContext, useState } from 'react';
import UploadPictures from '../../components/upload-pictures/UploadPictures';
import { DURATION } from '../../constants/add-item';
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../config/firebase.config';
import { AuthContext } from '../../contexts/Auth.context';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import {
	StyledButtonContainer,
	StyledContainer,
	StyledDate,
	StyledErrorContainer,
	StyledFlexContainer,
	StyledFormField,
	StyledInput,
	StyledInputNumber,
	StyledLabel,
	StyledResetButton,
	StyledSelect,
	StyledSubmitButton,
	StyledTextarea
} from './styles';
import { LABELS, MESSAGES, TITLES } from '../../constants/messages';

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
			<StyledContainer>
				<h2>{TITLES.addItem}</h2>
				<StyledFormField>
					<StyledLabel htmlFor='title'>{LABELS.title}</StyledLabel>
					<StyledInput
						type='text'
						name='title'
						id='title'
						value={formData.title}
						onChange={e =>
							handleChange(formData, setFormData, 'title', e.target.value)
						}
						invalid={errors?.title}
					/>
				</StyledFormField>
				<StyledFlexContainer>
					<div>
						<StyledLabel htmlFor='startingPrice'>
							{LABELS.startingPrice}
						</StyledLabel>
						<StyledInputNumber
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
							invalid={errors?.startingPrice}
						/>
						<span>{MESSAGES.currency}</span>
					</div>
					<div>
						<StyledLabel htmlFor='duration'>{LABELS.duration}</StyledLabel>
						<StyledSelect
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
						</StyledSelect>
					</div>

					{formData.duration === '0' ? (
						<StyledDate>
							La subasta terminará dentro de 5 minutos.{' '}
							<strong>Esta opción sólo está para hacer pruebas.</strong>
						</StyledDate>
					) : (
						<StyledDate>
							{MESSAGES.printDatePre}
							{printDate(formData.duration)}
							{MESSAGES.printDateAt}
							{printTime()}
						</StyledDate>
					)}
				</StyledFlexContainer>

				<StyledFormField>
					<StyledLabel htmlFor='description'>{LABELS.description}</StyledLabel>
					<StyledTextarea
						name='description'
						id='description'
						value={formData.description}
						onChange={e =>
							handleChange(formData, setFormData, 'description', e.target.value)
						}
						invalid={errors?.description}
					></StyledTextarea>
				</StyledFormField>

				{Object.keys(errors).length !== 0 && (
					<StyledErrorContainer>
						<p>{errors?.title}</p>
						<p>{errors?.startingPrice}</p>
						<p>{errors?.description}</p>
					</StyledErrorContainer>
				)}
			</StyledContainer>

			<StyledContainer>
				<UploadPictures
					pictures={pictures}
					setPictures={setPictures}
					errors={errors}
				/>
			</StyledContainer>

			<StyledButtonContainer>
				<StyledResetButton type='button' onClick={() => navigate(-1)}>
					{MESSAGES.back}
				</StyledResetButton>
				<StyledResetButton
					type='button'
					onClick={() =>
						resetForm(setFormData, INITIAL_STATE, setPictures, setErrors)
					}
				>
					{MESSAGES.reset}
				</StyledResetButton>
				<StyledSubmitButton>{MESSAGES.submitItem}</StyledSubmitButton>
			</StyledButtonContainer>
		</form>
	);
};

export default AddItem;

const resetForm = (setFormData, INITIAL_STATE, setPictures, setErrors) => {
	setFormData(INITIAL_STATE);
	setPictures([]);
	setErrors({});
};

const handleChange = (formData, setFormData, key, value) => {
	setFormData({
		...formData,
		[key]: value
	});
};

const validateForm = (formData, pictures) => {
	const errorMessages = {};
	if (formData.title === '') errorMessages.title = MESSAGES.requiredTitle;
	if (formData.startingPrice < 1)
		errorMessages.startingPrice = MESSAGES.invalidStartingPrice;
	if (formData.description === '')
		errorMessages.description = MESSAGES.requiredDescription;
	if (pictures.length === 0) errorMessages.pictures = MESSAGES.requiredPicture;
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
	if (formData.duration === '0') {
		endDate.setMinutes(endDate.getMinutes() + 5);
	}
	const userToUpdate = doc(db, 'users', loggedUser.email);

	try {
		// Enviar fotos
		const allUrls = [];
		await Promise.all(
			pictures.map(async (picture, index) => {
				const storageRef = ref(
					storage,
					`${loggedUser.email}/${id}/picture0${index}`
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
			// id,
			sellerEmail: loggedUser.email,
			sellerID: loggedUser.uid,
			currentPrice: formData.startingPrice,
			highestBid: 0,
			highestBidder: '',
			bids: 0,
			favs: 0,
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

import { useContext, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { itemsDB, storage } from '../../config/firebase.config';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import Error from '../error/Error';
import {
	StyledButtonContainer,
	StyledContainer,
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
import EditPictures from '../../components/edit-pictures/EditPictures';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { AuthContext } from '../../contexts/Auth.context';

const EditItem = () => {
	const { itemId } = useParams();
	const navigate = useNavigate();
	const { state } = useLocation();
	const { loggedUser } = useContext(AuthContext);
	if (!state) return <Error backButton>{MESSAGES.cannotEdit}</Error>;

	const INITIAL_ITEM = {
		title: state.title,
		price: state.currentPrice === 0 ? state.startingPrice : state.currentPrice,
		description: state.description
	};
	const [formData, setFormData] = useState(INITIAL_ITEM);
	const [errors, setErrors] = useState({});
	const [uploadedPictures, setUploadedPictures] = useState(state.pictures);
	const [newPictures, setNewPictures] = useState([]);

	return (
		<form
			onSubmit={e =>
				handleSubmit(
					e,
					itemId,
					formData,
					setErrors,
					navigate,
					uploadedPictures,
					newPictures,
					loggedUser.email
				)
			}
		>
			<StyledContainer>
				<h2>{TITLES.editItem}</h2>
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
						<StyledLabel htmlFor='price'>{LABELS.price}</StyledLabel>
						<StyledInputNumber
							type='number'
							name='price'
							id='price'
							value={formData.price}
							disabled
						/>
						<span>{MESSAGES.currency}</span>
					</div>

					<div>
						<StyledLabel htmlFor='duration'>{LABELS.duration}</StyledLabel>
						<StyledSelect
							name='duration'
							id='duration'
							value={formData.duration}
							disabled
						>
							<option value={''}>{LABELS.forbidden}</option>
						</StyledSelect>
					</div>
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

				{(errors.title || errors.description) && (
					<StyledErrorContainer>
						<p>{errors?.title}</p>
						<p>{errors?.description}</p>
					</StyledErrorContainer>
				)}
			</StyledContainer>

			<StyledContainer>
				<EditPictures
					uploadedPictures={uploadedPictures}
					setUploadedPictures={setUploadedPictures}
					newPictures={newPictures}
					setNewPictures={setNewPictures}
					errors={errors}
					itemId={itemId}
				/>
			</StyledContainer>

			<StyledButtonContainer>
				<StyledResetButton type='button' onClick={() => navigate(-1)}>
					{MESSAGES.back}
				</StyledResetButton>
				<StyledResetButton
					type='button'
					onClick={() => setFormData(INITIAL_ITEM)}
				>
					{MESSAGES.revert}
				</StyledResetButton>
				<StyledSubmitButton type='submit'>
					{MESSAGES.submitChanges}
				</StyledSubmitButton>
			</StyledButtonContainer>
		</form>
	);
};

export default EditItem;

const handleChange = (formData, setFormData, key, value) => {
	setFormData({
		...formData,
		[key]: value
	});
};

const validateForm = (data, uploadedPictures, newPictures) => {
	const errorMessages = {};
	if (data.title === '') errorMessages.title = MESSAGES.requiredTitle;
	if (data.description === '')
		errorMessages.description = MESSAGES.requiredDescription;
	if (uploadedPictures.length + newPictures.length === 0)
		errorMessages.pictures = MESSAGES.requiredPicture;
	return Object.keys(errorMessages).length === 0 ? null : errorMessages;
};

const handleSubmit = async (
	e,
	id,
	data,
	setErrors,
	navigate,
	uploadedPictures,
	newPictures,
	email
) => {
	e.preventDefault();

	// Validar formulario
	const invalidFields = validateForm(data, uploadedPictures, newPictures);
	setErrors({ ...invalidFields });
	if (invalidFields) return;

	try {
		// Enviar fotos nuevas al Storage
		// A los índices de las fotos nuevas se les suma 10 para que no entren en conflicto con las anteriores fotos
		const allUrls = [];
		await Promise.all(
			newPictures.map(async (picture, index) => {
				const storageRef = ref(storage, `${email}/${id}/picture${index + 10}`);
				await uploadBytes(storageRef, picture);
				const pictureURL = await getDownloadURL(storageRef);
				// console.log(`URL picture${index}: ${pictureURL}`);
				allUrls.push(pictureURL);
			})
		);

		// Actualizar título y descripción del anuncio
		// Añadir array de fotos nuevas
		const itemToUpdate = doc(itemsDB, id);
		await updateDoc(itemToUpdate, {
			title: data.title,
			description: data.description,
			pictures: arrayUnion(...allUrls)
		});
		navigate(`/itm/${id}`);
	} catch (err) {
		console.error(err);
	}
};

import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { itemsDB } from '../../config/firebase.config';
import { doc, updateDoc } from 'firebase/firestore';
import Error from '../error/Error';
import {
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

const EditItem = () => {
	const { itemId } = useParams();
	const navigate = useNavigate();
	const { state } = useLocation();
	if (!state) return <Error>No tiene permiso para editar este anuncio</Error>;

	const INITIAL_ITEM = {
		title: state.title,
		price: state.currentPrice === 0 ? state.startingPrice : state.currentPrice,
		description: state.description
	};
	const [formData, setFormData] = useState(INITIAL_ITEM);
	const [errors, setErrors] = useState({});

	return (
		<form
			onSubmit={e => handleSubmit(e, itemId, formData, setErrors, navigate)}
		>
			<StyledContainer>
				<h2>Editar anuncio</h2>
				<StyledFormField>
					<StyledLabel htmlFor='title'>Título</StyledLabel>
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
						<StyledLabel htmlFor='price'>Precio</StyledLabel>
						<StyledInputNumber
							type='number'
							name='price'
							id='price'
							value={formData.price}
							disabled
						/>
						<span>EUR</span>
					</div>

					<div>
						<StyledLabel htmlFor='duration'>Duración</StyledLabel>
						<StyledSelect
							name='duration'
							id='duration'
							value={formData.duration}
							disabled
						>
							<option value={''}>No se puede modificar</option>
						</StyledSelect>
					</div>
				</StyledFlexContainer>
				<StyledFormField>
					<StyledLabel htmlFor='description'>Descripción</StyledLabel>
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
						<p>{errors?.description}</p>
					</StyledErrorContainer>
				)}
			</StyledContainer>

			<StyledContainer>
				<button type='button' onClick={() => navigate(`/itm/${itemId}`)}>
					Volver
				</button>
				<StyledResetButton
					type='button'
					onClick={() => setFormData(INITIAL_ITEM)}
				>
					Descartar cambios
				</StyledResetButton>
				<StyledSubmitButton type='submit'>Publicar cambios</StyledSubmitButton>
			</StyledContainer>
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

const validateForm = data => {
	const errorMessages = {};
	if (data.title === '') errorMessages.title = 'Título necesario';
	if (data.description === '')
		errorMessages.description = 'Descripción necesaria';
	return Object.keys(errorMessages).length === 0 ? null : errorMessages;
};

const handleSubmit = async (e, id, data, setErrors, navigate) => {
	e.preventDefault();

	// Validar formulario
	const invalidFields = validateForm(data);
	setErrors({ ...invalidFields });
	if (invalidFields) return;

	try {
		const itemToUpdate = doc(itemsDB, id);
		await updateDoc(itemToUpdate, {
			title: data.title,
			description: data.description
		});
		navigate(`/itm/${id}`);
	} catch (err) {
		console.error(err);
	}
};

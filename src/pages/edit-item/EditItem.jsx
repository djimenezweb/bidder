import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { itemsDB } from '../../config/firebase.config';
import { doc, updateDoc } from 'firebase/firestore';
import Unauthorized from '../unauthorized/Unauthorized';

const EditItem = () => {
	const { itemId } = useParams();
	const navigate = useNavigate();
	const { state } = useLocation();
	if (!state)
		return (
			<Unauthorized>No tiene permiso para editar este anuncio</Unauthorized>
		);

	const INITIAL_ITEM = {
		title: state.title,
		price: state.currentPrice === 0 ? state.startingPrice : state.currentPrice,
		description: state.description
	};
	const [formData, setFormData] = useState(INITIAL_ITEM);
	const [errors, setErrors] = useState({});
	console.log(state);

	return (
		<>
			<h2>Editar anuncio</h2>
			<form>
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
					<label htmlFor='price'>Precio</label>
					<input
						type='number'
						name='price'
						id='price'
						value={formData.price}
						disabled
					/>{' '}
					€
				</div>
				<div>
					<label htmlFor='duration'>Duración</label>
					<select
						name='duration'
						id='duration'
						value={formData.duration}
						disabled
					>
						<option value={''}>No se puede modificar</option>
					</select>
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

				<div>
					<button type='button' onClick={() => navigate(`/itm/${itemId}`)}>
						Volver
					</button>
					<button type='button' onClick={() => setFormData(INITIAL_ITEM)}>
						Descartar cambios
					</button>
					<button
						type='submit'
						onClick={e =>
							handleSubmit(e, itemId, formData, setErrors, navigate)
						}
					>
						Publicar cambios
					</button>
				</div>
			</form>
		</>
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
	if (data.title === '') errorMessages.title = 'Campo requerido';
	if (data.description === '') errorMessages.description = 'Campo requerido';
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

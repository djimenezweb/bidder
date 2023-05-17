import { useContext, useState } from 'react';

// Firebase
import { addDoc } from 'firebase/firestore';
import { itemsDB } from '../../config/firebase.config';
import { AuthContext } from '../../contexts/Auth.context';

const AddItem = () => {
	const INITIAL_STATE = {
		title: '',
		startingPrice: 1,
		duration: 1,
		description: ''
	};

	const { loggedUser } = useContext(AuthContext);
	const [newItem, setNewItem] = useState(INITIAL_STATE);

	console.log('CARGANDO');

	return (
		<>
			<h2>Crear anuncio</h2>
			<form
				onSubmit={e =>
					handleSubmit(e, newItem, loggedUser, setNewItem, INITIAL_STATE)
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
	INITIAL_STATE
) => {
	e.preventDefault();
	const today = new Date();
	const endDate = new Date();
	endDate.setDate(endDate.getDate() + Number(newItem.duration));
	console.log(today.toISOString());
	console.log(endDate.toISOString());

	try {
		await addDoc(itemsDB, {
			...newItem,
			sellerEmail: loggedUser.email,
			sellerID: loggedUser.uid,
			currentPrice: newItem.startingPrice,
			highestBid: 0,
			creationDate: today.toISOString(),
			endDate: endDate.toISOString()
		});
		setNewItem(INITIAL_STATE);
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

/* 

				<div>
					<label htmlFor='condition'>Estado</label>
					<select name='condition' id='condition'>
						<option value='0'>Estado</option>
						<option value='5'>Nuevo</option>
						<option value='4'>Como nuevo</option>
						<option value='3'>En buen estado</option>
						<option value='2'>Aceptable</option>
						<option value='1'>Desconocido / No funciona</option>
					</select>
				</div>

*/

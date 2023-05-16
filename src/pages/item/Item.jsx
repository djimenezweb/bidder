import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { itemsDB } from '../../config/firebase.config';

const Item = () => {
	const { itemId } = useParams();
	const { state } = useLocation();
	const [bid, setBid] = useState();
	return (
		<>
			<p>ID (Params): {itemId}</p>
			<p>ID (State): {state.id}</p>
			<h2>{state.title}</h2>
			<p>{state.description}</p>
			<p>{state.currentPrice} €</p>
			<form onSubmit={e => handleSubmit(e, state.id, bid)}>
				<label htmlFor='bid'>Pujar</label>
				<input
					type='text'
					name='bid'
					id='bid'
					value={bid}
					onChange={e => setBid(e.target.value)}
				/>
				<button>Pujar</button>
			</form>
		</>
	);
};

const handleSubmit = async (e, id, bid) => {
	e.preventDefault();

	try {
		const itemToUpdate = doc(itemsDB, id);
		await updateDoc(itemToUpdate, bid);
		console.log('Puja confirmada');
	} catch (err) {
		console.error('Error al actualizar el documento', err);
	}
};

export default Item;

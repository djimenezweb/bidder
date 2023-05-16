import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase.config';

const Item = () => {
	const { itemId } = useParams();
	const [bid, setBid] = useState('');
	const [item, setItem] = useState();

	useEffect(() => {
		const unsub = onSnapshot(doc(db, 'items', itemId), doc => {
			const response = doc.data();
			setItem(response);
		});

		return () => unsub();
	}, []);

	if (!item) return <p>Loading...</p>;

	return (
		<>
			<p>ID (params): {itemId}</p>
			<h2>{item.title}</h2>
			<p>{item.description}</p>
			<p>{item.currentPrice} €</p>
			<form onSubmit={e => handleSubmit(e, itemId, bid)}>
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
		const itemToUpdate = doc(db, 'items', id);
		await updateDoc(itemToUpdate, { currentPrice: bid });
		console.log('Puja confirmada');
	} catch (err) {
		console.error('Error al actualizar el documento', err);
	}
};

export default Item;

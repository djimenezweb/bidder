import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase.config';
import Countdown from '../../components/countdown/Countdown';

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
			<p>{item.currentPrice} €</p>
			<p style={{ opacity: 0.33 }}>highestBid: {item.highestBid} €</p>
			<p>{item.description}</p>
			<p>Vendido por {item.sellerEmail}</p>
			<p>
				La subasta finaliza el {printDate(item.endDate)} a las{' '}
				{printTime(item.endDate)}
			</p>
			<Countdown endDate={item.endDate} />
			<form onSubmit={e => handleSubmit(e, itemId, bid, item.highestBid)}>
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

const printDate = date => {
	const dateToPrint = new Date(date);
	return dateToPrint.toLocaleDateString('es-ES', { dateStyle: 'full' });
};

const printTime = date => {
	const timeToPrint = new Date(date);
	return timeToPrint.toLocaleTimeString('es-ES', {
		timeStyle: 'short'
	});
};

const handleSubmit = async (e, id, bid, highestBid) => {
	e.preventDefault();

	try {
		const itemToUpdate = doc(db, 'items', id);
		if (Number(highestBid) === 0) {
			await updateDoc(itemToUpdate, { highestBid: bid });
		} else if (Number(bid) > Number(highestBid)) {
			await updateDoc(itemToUpdate, {
				currentPrice: Number(highestBid) + 1,
				highestBid: bid
			});
		} else if (Number(bid) < Number(highestBid)) {
			await updateDoc(itemToUpdate, { currentPrice: Number(bid) + 1 });
		}
		console.log('Puja confirmada');
	} catch (err) {
		console.error('Error al actualizar el documento', err);
	}
};

export default Item;

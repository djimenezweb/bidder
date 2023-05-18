import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase.config';
import Countdown from '../../components/countdown/Countdown';

const Item = () => {
	const { itemId } = useParams();
	const [bid, setBid] = useState('');
	const [item, setItem] = useState(null);

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
			<form
				onSubmit={e =>
					handleSubmit(
						e,
						itemId,
						Number(bid),
						Number(item.highestBid),
						Number(item.currentPrice)
					)
				}
			>
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

const updateAuction = async (id, newPrice, newHighestBid) => {
	try {
		const itemToUpdate = doc(db, 'items', id);
		await updateDoc(itemToUpdate, {
			currentPrice: newPrice,
			highestBid: newHighestBid
		});
		console.log('Puja confirmada');
	} catch (err) {
		console.error('Error al actualizar el documento', err);
	}
};

const handleSubmit = async (e, id, bid, highestBid, currentPrice) => {
	e.preventDefault();
	let newPrice = currentPrice;
	let newHighestBid = highestBid;

	// Invalid
	if (bid < currentPrice) {
		console.log('Bid must be higher than current price');
		return;
	}

	// First bidder
	if (highestBid === 0) {
		console.log('First bidder');
		newHighestBid = bid;
		newPrice = currentPrice;
		updateAuction(id, newPrice, newHighestBid);
		return;
	}

	// Bidder wins
	if (bid > highestBid) {
		console.log('You are the highest bidder');
		newHighestBid = bid;
		if (highestBid + 1 > bid) {
			console.log('cannot add 1');
			newPrice = bid;
		} else {
			console.log('add 1');
			newPrice = highestBid + 1;
		}
		updateAuction(id, newPrice, newHighestBid);
		return;
	}

	// Bidder is overbid by previous user
	if (bid <= highestBid) {
		console.log('You have been outbid');
		newHighestBid = highestBid;
		if (bid + 1 > highestBid) {
			console.log('cannot add 1');
			newPrice = highestBid;
		} else {
			console.log('add 1');
			newPrice = bid + 1;
		}
		updateAuction(id, newPrice, newHighestBid);
		return;
	}

	// Invalid bid
	console.log('Invalid bid');
};

export default Item;

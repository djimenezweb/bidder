import { doc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase.config';
import Countdown from '../../components/countdown/Countdown';
import { AuthContext } from '../../contexts/Auth.context';
import PlaceBid from '../../components/place-bid/PlaceBid';

// Cómo hacer para que componente PlaceBid no se muestre si loggedUser es null

const Item = () => {
	const { itemId } = useParams();

	const [item, setItem] = useState(null);
	const { loggedUser } = useContext(AuthContext);
	console.log(loggedUser);

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
			<p>
				Logged user: {loggedUser?.email} {loggedUser?.uid}
			</p>
			<p>ID (params): {itemId}</p>
			<h2>{item.title}</h2>
			<p>{item.currentPrice} €</p>
			<p style={{ opacity: 0.33 }}>highestBid: {item.highestBid} €</p>
			<p style={{ opacity: 0.33 }}>highestBidder: {item.highestBidder}</p>
			<p>{item.description}</p>
			<p>Vendido por {item.sellerEmail}</p>
			<p>
				La subasta finaliza el {printDate(item.endDate)} a las{' '}
				{printTime(item.endDate)}
			</p>
			<Countdown endDate={item.endDate} />

			{loggedUser?.email !== item.sellerEmail ? (
				<PlaceBid />
			) : (
				<button>Inicia sesión para pujar</button>
			)}

			{loggedUser?.email === item.sellerEmail ? (
				<button>Editar</button>
			) : (
				<PlaceBid
					itemId={itemId}
					highestBid={item.highestBid}
					currentPrice={item.currentPrice}
					highestBidder={item.highestBidder}
				/>
			)}
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

export default Item;

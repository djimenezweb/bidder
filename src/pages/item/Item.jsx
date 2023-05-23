// Firebase
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase.config';

// Router
import { useParams } from 'react-router-dom';

import { useContext, useEffect, useState } from 'react';
import Countdown from '../../components/countdown/Countdown';
import { AuthContext } from '../../contexts/Auth.context';
import PlaceBid from '../../components/place-bid/PlaceBid';
import AuctionStatus from '../../components/auction-status/AuctionStatus';
import DeleteItem from '../../components/delete-item/DeleteItem';

const Item = () => {
	const { itemId } = useParams();

	const [item, setItem] = useState(null);
	const { loggedUser } = useContext(AuthContext);

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
			{item.pictures &&
				item.pictures.map((picture, index) => {
					return <img key={`${itemId}-${index}`} src={picture} />;
				})}

			<h2>{item.title}</h2>
			<p>ID: {itemId}</p>
			<p>{item.currentPrice} €</p>
			<p>{item.description}</p>
			<p>Vendido por {item.sellerEmail}</p>
			<p>
				La subasta finaliza el {printDate(item.endDate)} a las{' '}
				{printTime(item.endDate)}
			</p>
			<Countdown endDate={item.endDate} />
			{/* Si NO HAY loggedUser se le pide que inicie sesión */}
			{!loggedUser?.email && <p>Inicia sesión para pujar</p>}
			{/* Si HAY loggedUser y NO ES el vendedor, puede PUJAR */}
			{loggedUser?.email && loggedUser?.email !== item.sellerEmail && (
				<>
					<PlaceBid
						itemId={itemId}
						highestBid={item.highestBid}
						currentPrice={item.currentPrice}
						highestBidder={item.highestBidder}
					/>
					<AuctionStatus
						highestBid={item.highestBid}
						highestBidder={item.highestBidder}
						endDate={item.endDate}
					/>
				</>
			)}
			{/* Si HAY loggedUser y ES el vendedor, puede EDITAR y BORRAR */}
			{loggedUser?.email && loggedUser?.email === item.sellerEmail && (
				<>
					<button>Editar</button>
					<DeleteItem itemId={itemId} picturesArray={item.pictures} />
				</>
			)}
			<p style={{ opacity: 0.33 }}>
				<small>highestBid: {item.highestBid} €</small>
			</p>
			<p style={{ opacity: 0.33 }}>
				<small>highestBidder: {item.highestBidder}</small>
			</p>
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

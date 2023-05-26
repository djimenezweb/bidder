import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth.context';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import MiniItem from '../../components/mini-item/MiniItem';

const MyItems = () => {
	const { loggedUser } = useContext(AuthContext);
	const [items, setItems] = useState([]);
	const today = new Date();

	useEffect(() => {
		if (!loggedUser) return;
		getItemsByEmail(loggedUser.email, setItems);
	}, [loggedUser]);

	return (
		<>
			<h2>Mis anuncios</h2>

			<div>
				{items.length === 0 && <p>Todavía no has publicado ningún anuncio.</p>}

				{items.map(item => (
					<MiniItem key={item.id} item={item} today={today} />
				))}
			</div>
		</>
	);
};

export default MyItems;

const getItemsByEmail = async (email, setItems) => {
	try {
		const q = query(collection(db, 'items'), where('sellerEmail', '==', email));
		const querySnapshot = await getDocs(q);
		const data = [];
		querySnapshot.forEach(doc => data.push({ ...doc.data(), id: doc.id }));
		setItems(data);
	} catch (err) {
		console.error(err);
	}
};

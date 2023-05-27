import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth.context';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import MiniItem from '../../components/mini-item/MiniItem';

const MyItems = () => {
	const { loggedUser } = useContext(AuthContext);
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const today = new Date();

	useEffect(() => {
		if (!loggedUser) return;
		getItemsByEmail(loggedUser.email, setItems, setLoading);
	}, [loggedUser]);

	if (loading) return <p>Cargando...</p>;

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

const getItemsByEmail = async (email, setItems, setLoading) => {
	try {
		const q = query(collection(db, 'items'), where('sellerEmail', '==', email));
		const querySnapshot = await getDocs(q);
		const data = [];
		querySnapshot.forEach(
			doc => doc.data().title && data.push({ ...doc.data(), id: doc.id })
		);
		const orderedByEndDate = data.sort((a, b) => {
			if (a.endDate > b.endDate) return 1;
			if (a.endDate < b.endDate) return -1;
			return 0;
		});
		setItems(orderedByEndDate);
		setLoading(false);
	} catch (err) {
		console.error(err);
	}
};

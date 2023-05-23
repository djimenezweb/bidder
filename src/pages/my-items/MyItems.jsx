import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth.context';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import SmallItem from '../../components/small-item/SmallItem';

const MyItems = () => {
	const today = new Date();
	const { loggedUser } = useContext(AuthContext);
	const [items, setItems] = useState([]);

	useEffect(() => {
		if (!loggedUser) return;
		getItemsById(loggedUser.email, setItems);
	}, [loggedUser]);

	console.log(items);

	return (
		<>
			<h2>Mis anuncios</h2>

			<div>
				{items.length === 0 && <p>No hay resultados</p>}

				{items.map(item => (
					<SmallItem key={item.id} item={item} today={today} />
				))}
			</div>
		</>
	);
};

export default MyItems;

const getItemsById = async (email, setItems) => {
	try {
		const q = query(collection(db, 'items'), where('sellerEmail', '==', email));

		const querySnapshot = await getDocs(q);

		const data = [];

		querySnapshot.forEach(doc => data.push(doc.data()));

		setItems(data);
	} catch (err) {
		console.error(err);
	}
};

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth.context';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where
} from 'firebase/firestore';
import { db, usersDB } from '../../config/firebase.config';
import MiniItem from '../../components/mini-item/MiniItem';

const MyAuctions = () => {
	const { loggedUser } = useContext(AuthContext);
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const today = new Date();

	useEffect(() => {
		if (!loggedUser) return;
		getItemsById(loggedUser.email, setItems, setLoading);
	}, [loggedUser]);

	if (loading) return <p>Cargando...</p>;

	return (
		<>
			<h2>Mis subastas</h2>

			<div>
				{items.length === 0 && <p>Todavía no has pujado en ninguna subasta</p>}

				{items.map(item => (
					<MiniItem key={item.id} item={item} today={today} />
				))}
			</div>
		</>
	);
};

const getItemsById = async (email, setItems, setLoading) => {
	const userRef = doc(usersDB, email);
	try {
		const userToRead = await getDoc(userRef);
		const response = userToRead.data();
		console.log(response);
		const idArray = response.myAuctions;
		if (!idArray) return;

		const data = [];
		await Promise.all(
			idArray.map(async id => {
				const q = query(collection(db, 'items'), where('id', '==', id));
				const querySnapshot = await getDocs(q);
				querySnapshot.forEach(doc => data.push({ ...doc.data(), id: doc.id }));
			})
		);
		setItems(data);
		setLoading(false);
	} catch (err) {
		console.log(err);
	}
};

export default MyAuctions;

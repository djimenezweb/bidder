import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth.context';
import { doc, getDoc } from 'firebase/firestore';
import { itemsDB } from '../../config/firebase.config';
import MiniItem from '../../components/mini-item/MiniItem';

const MyAuctions = () => {
	const { loggedUser } = useContext(AuthContext);
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const today = new Date();

	useEffect(() => {
		if (!loggedUser) return;
		getItemsById(loggedUser.myAuctions, setItems, setLoading);
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

const getItemsById = async (myAuctions, setItems, setLoading) => {
	if (!myAuctions) {
		setLoading(false);
		return;
	}
	try {
		const docRefs = myAuctions.map(id => doc(itemsDB, id));
		const docSnapshots = await Promise.all(docRefs.map(ref => getDoc(ref)));
		const data = docSnapshots.map(snapshot => ({
			id: snapshot.id,
			...snapshot.data()
		}));
		setItems(data);
		setLoading(false);
	} catch (err) {
		console.log(err);
	}
};

export default MyAuctions;

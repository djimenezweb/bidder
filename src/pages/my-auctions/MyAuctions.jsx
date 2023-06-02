import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth.context';
import { doc, getDoc } from 'firebase/firestore';
import { itemsDB } from '../../config/firebase.config';
import MiniItem from '../../components/mini-item/MiniItem';
import { StyledContainer } from './styles';
import { MESSAGES } from '../../constants/messages';

const MyAuctions = () => {
	const { loggedUser } = useContext(AuthContext);
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const today = new Date();

	useEffect(() => {
		if (!loggedUser) return;
		getItemsById(loggedUser.myAuctions, setItems, setLoading);
	}, [loggedUser]);

	if (loading) return <p>{MESSAGES.loading}</p>;

	return (
		<>
			<h2>{MESSAGES.myAuctions}</h2>

			<div>
				{items.length === 0 && <p>{MESSAGES.nullAuctions}</p>}
				<StyledContainer>
					{items.map(item => (
						<MiniItem key={item.id} item={item} today={today} />
					))}
				</StyledContainer>
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
		const docRefs = await myAuctions.map(id => doc(itemsDB, id));
		console.log('docRefs', docRefs);
		const docSnapshots = await Promise.all(docRefs.map(ref => getDoc(ref)));
		console.log('docSnapshots', docSnapshots);
		const data = docSnapshots.map(snapshot => ({
			id: snapshot.id,
			...snapshot.data()
		}));
		console.log('data', data);
		const filteredData = data.filter(item => item.title);
		console.log('filteredData', filteredData);
		setItems(filteredData);
		setLoading(false);
	} catch (err) {
		console.log(err);
	}
};

export default MyAuctions;

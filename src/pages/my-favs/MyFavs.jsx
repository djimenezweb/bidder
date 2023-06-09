import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth.context';
import { doc, getDoc } from 'firebase/firestore';
import { itemsDB } from '../../config/firebase.config';
import MiniItem from '../../components/mini-item/MiniItem';
import { StyledContainer } from './styles';
import { MESSAGES } from '../../constants/messages';
import Loader from '../../components/loader/Loader';

const MyFavs = () => {
	const { loggedUser } = useContext(AuthContext);
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const today = new Date();

	useEffect(() => {
		if (!loggedUser) return;
		getItemsById(loggedUser.myFavs, setItems, setLoading);
	}, [loggedUser]);

	if (loading) return <Loader />;

	return (
		<>
			<h2>{MESSAGES.myFavs}</h2>

			<div>
				{items.length === 0 && <p>{MESSAGES.nullFavs}</p>}
				<StyledContainer>
					{items.map(item => (
						<MiniItem key={item.id} item={item} today={today} />
					))}
				</StyledContainer>
			</div>
		</>
	);
};

const getItemsById = async (myFavs, setItems, setLoading) => {
	if (!myFavs) {
		setLoading(false);
		return;
	}
	try {
		const docRefs = await myFavs.map(id => doc(itemsDB, id));
		const docSnapshots = await Promise.all(docRefs.map(ref => getDoc(ref)));
		const data = docSnapshots.map(snapshot => ({
			id: snapshot.id,
			...snapshot.data()
		}));

		// Filtrar por anuncios que tengan contenido (título)
		const filteredData = data.filter(item => item.title);

		// Ordenar array de pictures de cada anuncio
		filteredData.forEach(item =>
			item.pictures.sort((a, b) => {
				if (a < b) return -1;
				if (a > b) return 1;
				return 0;
			})
		);
		setItems(filteredData);
		setLoading(false);
	} catch (err) {
		console.log(err);
	}
};

export default MyFavs;

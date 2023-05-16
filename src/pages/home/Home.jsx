import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Icons
import { Gavel, Heart } from '@phosphor-icons/react';

// Firebase
import { onSnapshot } from 'firebase/firestore';
import { itemsDB } from '../../config/firebase.config';

const Home = () => {
	const [allItems, setAllItems] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const subscribeToData = onSnapshot(itemsDB, snapshot => {
			const response = snapshot.docs.map(doc => ({
				...doc.data(),
				id: doc.id
			}));
			response.length === 0 ? setAllItems([]) : setAllItems(response);
		});
		return () => subscribeToData();
	}, []);

	return (
		<>
			<h2>Home</h2>
			<Heart color='#AE2983' weight='thin' size={32} />
			<Heart color='#AE2983' weight='light' size={32} />
			<Heart color='#AE2983' weight='regular' size={32} />
			<Heart color='#AE2983' weight='bold' size={32} />
			<Heart color='#AE2983' weight='fill' size={32} />
			<Heart color='#AE2983' weight='duotone' size={32} />

			<Gavel size={32} weight='thin' />
			<Gavel size={32} weight='light' />
			<Gavel size={32} weight='regular' />
			<Gavel size={32} weight='bold' />
			<Gavel size={32} weight='fill' />
			<Gavel size={32} weight='duotone' />

			{allItems.map(item => {
				return (
					<article
						key={item.id}
						onClick={() => navigate(`/itm/${item.id}`, { state: item })}
					>
						<h3>{item.title}</h3>
						<p>{item.description}</p>
					</article>
				);
			})}
		</>
	);
};

export default Home;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Icons
import {
	ClockCountdown,
	CurrencyEur,
	Gavel,
	Heart,
	Money,
	PlusCircle,
	PlusSquare,
	Power,
	SignIn,
	SignOut,
	User,
	UserCircle,
	X
} from '@phosphor-icons/react';

// Firebase
import { onSnapshot } from 'firebase/firestore';
import { itemsDB } from '../../config/firebase.config';
import SearchBar from '../../components/search-bar/SearchBar';

const Home = () => {
	const [allItems, setAllItems] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const subscribeToData = onSnapshot(itemsDB, snapshot => {
			const response = snapshot.docs.map(doc => ({
				...doc.data(),
				id: doc.id
			}));
			response.length === 0 ? setAllItems([]) : setAllItems(response);
			response.length === 0 ? setSearchResults([]) : setSearchResults(response);
		});
		return () => subscribeToData();
	}, []);

	if (searchResults.length === 0) return <p>Loading...</p>;

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

			<User size={32} />
			<UserCircle size={32} />
			<SignIn size={32} />
			<SignOut size={32} />
			<Power size={32} />
			<X size={32} />
			<Money size={32} />
			<CurrencyEur size={32} />
			<ClockCountdown size={32} />
			<PlusCircle size={32} />
			<PlusSquare size={32} />

			<SearchBar allItems={allItems} setSearchResults={setSearchResults} />

			{searchResults.map(item => {
				return (
					<article key={item.id} onClick={() => navigate(`/itm/${item.id}`)}>
						<h3>{item.title}</h3>
						<p>{item.description}</p>
						<p>{item.currentPrice} €</p>
					</article>
				);
			})}
		</>
	);
};

export default Home;

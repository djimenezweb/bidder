import { useEffect, useState } from 'react';

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
import SmallItem from '../../components/small-item/SmallItem';

const Home = () => {
	const today = new Date();
	const [allItems, setAllItems] = useState(null);
	const [searchResults, setSearchResults] = useState(null);

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

	// console.log(searchResults);

	if (!allItems) return <p>Loading...</p>;

	return (
		<>
			<SearchBar allItems={allItems} setSearchResults={setSearchResults} />

			{searchResults.length === 0 && <h1>No hay resultados</h1>}

			{searchResults.map(item => (
				<SmallItem key={item.id} item={item} today={today} />
			))}

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
		</>
	);
};

export default Home;

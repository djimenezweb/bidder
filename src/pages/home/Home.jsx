import { useEffect, useState } from 'react';

// Firebase
import { onSnapshot } from 'firebase/firestore';
import { itemsDB } from '../../config/firebase.config';
import SearchBar from '../../components/search-bar/SearchBar';
import SmallItem from '../../components/small-item/SmallItem';
import { StyledGrid } from './styles';

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
			const orderedByEndDate = response.sort((a, b) => {
				if (a.endDate > b.endDate) return 1;
				if (a.endDate < b.endDate) return -1;
				return 0;
			});
			orderedByEndDate.length === 0
				? setAllItems([])
				: setAllItems(orderedByEndDate);
			orderedByEndDate.length === 0
				? setSearchResults([])
				: setSearchResults(orderedByEndDate);
		});
		return () => subscribeToData();
	}, []);

	// console.log(searchResults);

	if (!allItems) return <p>Loading...</p>;

	return (
		<>
			<SearchBar allItems={allItems} setSearchResults={setSearchResults} />

			<StyledGrid>
				{searchResults.length === 0 && <h1>No hay resultados</h1>}

				{searchResults.map(item => (
					<SmallItem key={item.id} item={item} today={today} />
				))}
			</StyledGrid>
		</>
	);
};

export default Home;

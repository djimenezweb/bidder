import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { itemsDB } from '../../config/firebase.config';
import SearchBar from '../../components/search-bar/SearchBar';
import SmallItem from '../../components/small-item/SmallItem';
import { StyledGrid } from './styles';
import { MESSAGES } from '../../constants/messages';
import Loader from '../../components/loader/Loader';
import Error from '../error/Error';

const Home = () => {
	const today = new Date();
	const [allItems, setAllItems] = useState(null);
	const [searchResults, setSearchResults] = useState(null);

	useEffect(() => {
		const subscribeToData = onSnapshot(itemsDB, snapshot => {
			// Recuperar datos
			const response = snapshot.docs.map(doc => ({
				...doc.data(),
				id: doc.id
			}));

			// Filtrar por anuncios vigentes
			const activeOnly = response.filter(
				item => item.endDate > today.toISOString()
			);

			// Ordenar array de pictures de cada anuncio
			activeOnly.forEach(item =>
				item.pictures.sort((a, b) => {
					if (a < b) return -1;
					if (a > b) return 1;
					return 0;
				})
			);

			// Ordenar cada anuncio por fecha de fin de subasta
			const orderedByEndDate = activeOnly.sort((a, b) => {
				if (a.endDate > b.endDate) return 1;
				if (a.endDate < b.endDate) return -1;
				return 0;
			});

			// Enviar datos filtrados y ordenados al estado
			orderedByEndDate.length === 0
				? setAllItems([])
				: setAllItems(orderedByEndDate);
			orderedByEndDate.length === 0
				? setSearchResults([])
				: setSearchResults(orderedByEndDate);
		});
		return () => subscribeToData();
	}, []);

	if (!allItems) return <Loader />;

	return (
		<>
			<SearchBar allItems={allItems} setSearchResults={setSearchResults} />

			{searchResults.length === 0 && <Error>{MESSAGES.noResults}</Error>}

			<StyledGrid>
				{searchResults.map(item => (
					<SmallItem key={item.id} item={item} today={today} />
				))}
			</StyledGrid>
		</>
	);
};

export default Home;

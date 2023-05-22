import { MagnifyingGlass } from '@phosphor-icons/react';
import {
	StyledForm,
	StyledInput,
	StyledSearchButton,
	StyledSearchContainer
} from './styles';

const SearchBar = ({ allItems, setSearchResults }) => {
	return (
		<StyledForm onSubmit={e => handleSubmit(e)}>
			<StyledSearchContainer>
				<StyledSearchButton>
					<MagnifyingGlass size={32} />
				</StyledSearchButton>
				<StyledInput
					type='search'
					id='search'
					name='search'
					onChange={e =>
						handleSearchChange(e.target.value, allItems, setSearchResults)
					}
				/>
			</StyledSearchContainer>
		</StyledForm>
	);
};

const handleSubmit = e => e.preventDefault();

const handleSearchChange = (value, allItems, setSearchResults) => {
	if (!value) return setSearchResults(allItems);
	console.log(allItems);
	const filteredItems = allItems.filter(
		item =>
			item.title.toLowerCase().includes(value.toLowerCase()) ||
			item.description.toLowerCase().includes(value.toLowerCase())
	);
	setSearchResults(filteredItems);
};

export default SearchBar;

import { MagnifyingGlass } from '@phosphor-icons/react';
import {
	StyledForm,
	StyledInput,
	StyledSearchButton,
	StyledSearchContainer
} from './styles';
import { COLORS } from '../../constants/colors';
import { useState } from 'react';

const SearchBar = ({ allItems, setSearchResults }) => {
	const [focus, setFocus] = useState(false);
	return (
		<StyledForm onSubmit={e => handleSubmit(e)}>
			<StyledSearchContainer focus={focus}>
				<StyledSearchButton>
					<MagnifyingGlass size={32} color={COLORS.accent100} />
				</StyledSearchButton>
				<StyledInput
					type='search'
					id='search'
					name='search'
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
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
	const filteredItems = allItems.filter(
		item =>
			item.title.toLowerCase().includes(value.toLowerCase()) ||
			item.description.toLowerCase().includes(value.toLowerCase())
	);
	setSearchResults(filteredItems);
};

export default SearchBar;

const SearchBar = ({ allItems, setSearchResults }) => {
	return (
		<form onSubmit={e => handleSubmit(e)}>
			<input
				type='search'
				id='search'
				name='search'
				onChange={e =>
					handleSearchChange(e.target.value, allItems, setSearchResults)
				}
			/>
			<button>Search</button>
		</form>
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

import { useLocation, useParams } from 'react-router-dom';

const Item = () => {
	const { itemId } = useParams();
	const { state } = useLocation();
	return (
		<>
			<p>Params: Item {itemId}</p>
			<h2>{state.title}</h2>
			<p>{state.description}</p>
		</>
	);
};

export default Item;

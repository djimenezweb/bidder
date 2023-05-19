import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth.context';

const AuctionStatus = ({ highestBid, highestBidder, endDate }) => {
	const { loggedUser } = useContext(AuthContext);
	const end = new Date(endDate);
	const today = new Date();
	const timeSpan = end - today;

	if (highestBid === 0) {
		return <p>No hay ningún pujador, ¡tú puedes ser el primero!</p>;
	}

	if (timeSpan <= 0 && highestBidder === loggedUser?.email) {
		return <p>¡Enhorabuena! Has ganado la subasta</p>;
	}

	if (highestBidder === loggedUser?.email) {
		return <p>Eres el mayor postor</p>;
	}

	if (timeSpan <= 0) {
		return <p>La subasta ha finalizado</p>;
	}

	return <p>Haz una puja si quieres conseguir este artículo</p>;
};

export default AuctionStatus;

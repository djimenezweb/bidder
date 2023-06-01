import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth.context';
import { STATUS } from '../../constants/messages';

const AuctionStatus = ({ highestBid, highestBidder, endDate, seller }) => {
	const { loggedUser } = useContext(AuthContext);
	const end = new Date(endDate);
	const today = new Date();
	const timeSpan = end - today;

	if (!loggedUser) {
		return <p>{STATUS.disabled}</p>;
	}

	if (loggedUser.email === seller) {
		return <p>{STATUS.seller}</p>;
	}

	if (highestBid === 0) {
		return <p>{STATUS.firstBidder}</p>;
	}

	if (timeSpan <= 0 && highestBidder === loggedUser?.email) {
		return <p>{STATUS.winner}</p>;
	}

	if (highestBidder === loggedUser?.email) {
		return (
			<p>
				{STATUS.highestBidder} {highestBid} €.
			</p>
		);
	}

	if (timeSpan <= 0) {
		return <p>{STATUS.end}</p>;
	}

	return <p>{STATUS.default}</p>;
};

export default AuctionStatus;

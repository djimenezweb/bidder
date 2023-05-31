import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import { AuthContext } from '../../contexts/Auth.context';
import { useContext, useState } from 'react';
import { StyledForm, StyledInput, StyledSubmitButton } from './styles';
import { STATUS } from '../../constants/messages';

const PlaceBid = ({
	itemId,
	highestBid,
	currentPrice,
	highestBidder,
	bids,
	setStatus
}) => {
	const { loggedUser } = useContext(AuthContext);
	const [bid, setBid] = useState('');

	return (
		<StyledForm
			onSubmit={e =>
				handleSubmit(
					e,
					itemId,
					Number(bid.replace(/,/g, '.')),
					Number(highestBid),
					Number(currentPrice),
					highestBidder,
					bids,
					loggedUser.email,
					setBid,
					setStatus
				)
			}
		>
			<StyledInput
				type='text'
				name='bid'
				id='bid'
				value={bid}
				onChange={e => setBid(e.target.value)}
			/>
			<StyledSubmitButton>Pujar</StyledSubmitButton>
		</StyledForm>
	);
};

const updateAuction = async (
	id,
	newPrice,
	newHighestBid,
	newHighestBidder,
	setBid,
	newBids
) => {
	const itemToUpdate = doc(db, 'items', id);
	const userToUpdate = doc(db, 'users', newHighestBidder);
	try {
		await updateDoc(itemToUpdate, {
			currentPrice: newPrice,
			highestBid: newHighestBid,
			highestBidder: newHighestBidder,
			bids: newBids
		});
		await updateDoc(userToUpdate, { myAuctions: arrayUnion(id) });
		console.log('Puja confirmada');
		setBid('');
	} catch (err) {
		console.error('Error al actualizar el documento', err);
	}
};

const handleSubmit = async (
	e,
	id,
	bid,
	highestBid,
	currentPrice,
	highestBidder,
	bids,
	email,
	setBid,
	setStatus
) => {
	e.preventDefault();
	console.log('bid: ' + bid);
	let newPrice = currentPrice;
	let newHighestBid = highestBid;
	let newHighestBidder = highestBidder;
	const newBids = Number(bids) + 1;

	// Invalid
	if (bid < currentPrice) {
		console.log('Bid must be higher than current price');
		setStatus(STATUS.lowPrice);
		return;
	}

	// First bidder
	if (highestBid === 0) {
		// console.log('First bidder');
		// newHighestBid = bid;
		// newPrice = currentPrice;
		// newHighestBidder = email;
		await updateAuction(id, currentPrice, bid, email, setBid, newBids);
		setStatus(null);
		// updateAuction(id, newPrice, newHighestBid, newHighestBidder, setBid);
		return;
	}

	// Bidder wins
	if (bid > highestBid) {
		console.log('You are the highest bidder');
		newHighestBid = bid;
		newHighestBidder = email;
		if (highestBid + 1 > bid) {
			console.log('cannot add 1');
			newPrice = bid;
		} else {
			console.log('add 1');
			newPrice = highestBid + 1;
		}
		await updateAuction(
			id,
			newPrice,
			newHighestBid,
			newHighestBidder,
			setBid,
			newBids
		);
		setStatus(null);
		return;
	}

	// Bidder is outbid by previous user
	if (bid <= highestBid) {
		console.log('You have been outbid');
		newHighestBid = highestBid;
		newHighestBidder = highestBidder;
		if (bid + 1 > highestBid) {
			console.log('cannot add 1');
			newPrice = highestBid;
		} else {
			console.log('add 1');
			newPrice = bid + 1;
		}
		await updateAuction(
			id,
			newPrice,
			newHighestBid,
			newHighestBidder,
			setBid,
			newBids
		);
		setStatus(STATUS.outBid);
		return;
	}

	// Invalid bid
	console.log('Invalid bid');
	setStatus(STATUS.invalid);
};

export default PlaceBid;

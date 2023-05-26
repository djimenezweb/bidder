import { useNavigate } from 'react-router-dom';
import { printTimeLeft } from '../../functions/print-time-left';
import {
	StyledBids,
	StyledImg,
	StyledPrice,
	StyledRow,
	StyledTimeLeft,
	StyledTitle
} from './styles';
import AuctionStatus from '../auction-status/AuctionStatus';

const MiniItem = ({ item, today }) => {
	const navigate = useNavigate();
	const end = new Date(item.endDate);
	const timeSpan = end - today;
	const timeLeft = printTimeLeft(timeSpan);

	return (
		<StyledRow onClick={() => navigate(`/itm/${item.id}`)}>
			<StyledImg src={item.pictures[0]} />
			<StyledTitle>{item.title}</StyledTitle>
			<StyledPrice>{item.currentPrice} EUR</StyledPrice>
			<StyledBids>{item.bids} pujas</StyledBids>
			<StyledTimeLeft>{timeLeft}</StyledTimeLeft>
			<AuctionStatus
				highestBid={item.highestBid}
				highestBidder={item.highestBidder}
				endDate={item.endDate}
			/>
		</StyledRow>
	);
};

export default MiniItem;

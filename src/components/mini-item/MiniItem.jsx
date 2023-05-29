import { useNavigate } from 'react-router-dom';
import { printTimeLeft } from '../../utils/print-time-left';
import {
	StyledBids,
	StyledCurrency,
	StyledImg,
	StyledPrice,
	StyledRow,
	StyledTimeLeft,
	StyledTitle
} from './styles';

const MiniItem = ({ item, today }) => {
	const navigate = useNavigate();
	const end = new Date(item.endDate);
	const timeSpan = end - today;
	const timeLeft = printTimeLeft(timeSpan);

	return (
		<StyledRow onClick={() => navigate(`/itm/${item.id}`)}>
			<StyledImg src={item.pictures[0]} />
			<StyledTitle>{item.title}</StyledTitle>

			<StyledPrice>
				{Number(item.currentPrice).toLocaleString('es-ES', {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2
				})}{' '}
				<StyledCurrency>EUR</StyledCurrency>
			</StyledPrice>
			<StyledBids>
				{item.bids} {Number(item.bids) === 1 ? 'puja' : 'pujas'}
			</StyledBids>

			<StyledTimeLeft>{timeLeft}</StyledTimeLeft>
		</StyledRow>
	);
};

export default MiniItem;

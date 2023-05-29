import { useNavigate } from 'react-router-dom';
import { printTimeLeft } from '../../functions/print-time-left';
import {
	StyledCell,
	StyledCurrency,
	StyledFlexContainer,
	StyledImg,
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
			<StyledTitle>
				<StyledImg src={item.pictures[0]} />
				<span>{item.title}</span>
			</StyledTitle>
			<StyledFlexContainer>
				<StyledCell>
					{Number(item.currentPrice).toLocaleString('es-ES', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					})}{' '}
					<StyledCurrency>EUR</StyledCurrency>
				</StyledCell>
				<StyledCell>
					{item.bids} {Number(item.bids) === 1 ? 'puja' : 'pujas'}
				</StyledCell>
			</StyledFlexContainer>
			<StyledTimeLeft>{timeLeft}</StyledTimeLeft>
		</StyledRow>
	);
};

export default MiniItem;

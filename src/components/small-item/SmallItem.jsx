import { useNavigate } from 'react-router-dom';
import {
	StyledArticle,
	StyledBids,
	StyledCurrency,
	StyledImageContainer,
	StyledImg,
	StyledPrice,
	StyledTimeLeft,
	StyledTitle
} from './styles';
import { printTimeLeft } from '../../utils/print-time-left';

const SmallItem = ({ item, today }) => {
	const navigate = useNavigate();
	const end = new Date(item.endDate);
	const timeSpan = end - today;
	const timeLeft = printTimeLeft(timeSpan);

	return (
		<StyledArticle key={item.id} onClick={() => navigate(`/itm/${item.id}`)}>
			<StyledImageContainer>
				{item.pictures && <StyledImg src={item.pictures[0]} />}
			</StyledImageContainer>

			<StyledTitle>{item.title}</StyledTitle>

			<StyledPrice>
				{Number(item.currentPrice).toLocaleString('es-ES', {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2
				})}{' '}
				<StyledCurrency>€</StyledCurrency>
			</StyledPrice>

			<StyledBids>
				{item.bids} {item.bids === 1 ? 'puja' : 'pujas'}
			</StyledBids>
			<StyledTimeLeft color={timeSpan}>{timeLeft}</StyledTimeLeft>
		</StyledArticle>
	);
};

export default SmallItem;

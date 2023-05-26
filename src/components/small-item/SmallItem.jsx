import { useNavigate } from 'react-router-dom';
import {
	StyledArticle,
	StyledFlexContainer,
	StyledImageContainer,
	StyledImg,
	StyledInfo,
	StyledPrice,
	StyledTimeLeft,
	StyledTitle
} from './styles';
import { printTimeLeft } from '../../functions/print-time-left';

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

			<StyledFlexContainer>
				<StyledInfo>
					<StyledTitle>{item.title}</StyledTitle>
					<StyledTimeLeft>{timeLeft}</StyledTimeLeft>
				</StyledInfo>

				<StyledPrice>{item.currentPrice} €</StyledPrice>
			</StyledFlexContainer>
		</StyledArticle>
	);
};

export default SmallItem;

import { useNavigate } from 'react-router-dom';
import {
	StyledArticle,
	StyledBids,
	StyledCurrency,
	StyledFavContainer,
	StyledFlexContainer,
	StyledImageContainer,
	StyledImg,
	StyledPrice,
	StyledTimeLeft,
	StyledTitle
} from './styles';
import { printTimeLeft } from '../../utils/print-time-left';
import { MESSAGES } from '../../constants/messages';
import Fav from '../fav/Fav';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth.context';
import { handleFav } from '../../utils/toggle-fav';

const SmallItem = ({ item, today }) => {
	const navigate = useNavigate();
	const end = new Date(item.endDate);
	const timeSpan = end - today;
	const timeLeft = printTimeLeft(timeSpan);
	const { loggedUser, setLoggedUser } = useContext(AuthContext);
	const isFav = loggedUser?.myFavs?.includes(item.id);

	return (
		<StyledArticle key={item.id} onClick={() => navigate(`/itm/${item.id}`)}>
			<StyledImageContainer>
				{item.pictures && <StyledImg src={item.pictures[0]} />}
			</StyledImageContainer>

			<StyledTitle>{item.title}</StyledTitle>

			<StyledFlexContainer>
				<StyledPrice>
					{Number(item.currentPrice).toLocaleString('es-ES', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					})}{' '}
					<StyledCurrency>{MESSAGES.currencySymbol}</StyledCurrency>
				</StyledPrice>
				<StyledFavContainer
					onClickCapture={e =>
						handleFav(
							e,
							navigate,
							loggedUser,
							setLoggedUser,
							item.id,
							isFav,
							item.favs
						)
					}
				>
					<Fav size={32} isFav={isFav} />
				</StyledFavContainer>
			</StyledFlexContainer>

			<StyledBids>
				{item.bids} {item.bids === 1 ? MESSAGES.bid : MESSAGES.bids}
				<StyledTimeLeft color={timeSpan}>{timeLeft}</StyledTimeLeft>
			</StyledBids>
		</StyledArticle>
	);
};

export default SmallItem;

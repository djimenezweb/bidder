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

const printTimeLeft = timeSpan => {
	const daysLeft = Math.floor(timeSpan / 86400000);
	const hoursLeft = Math.floor((timeSpan % 86400000) / 3600000);
	const minutesLeft = Math.floor((timeSpan % 3600000) / 60000);

	if (timeSpan <= 0) {
		return 'Finalizado';
	}
	// 5 minutos
	if (timeSpan <= 300000) {
		return '¡Termina en unos minutos!';
	}
	// Menos de 1 hora
	if (timeSpan <= 3600000) {
		return `Termina en ${minutesLeft} min`;
	}
	// 1 día
	if (timeSpan <= 86400000) {
		return `Termina en ${hoursLeft}h`;
	}
	if (daysLeft === 1) {
		return `Termina en ${daysLeft} día`;
	}
	return `Termina en ${daysLeft} días y ${hoursLeft} horas`;
};

export default SmallItem;

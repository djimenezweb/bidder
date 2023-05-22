import { useNavigate } from 'react-router-dom';
import {
	StyledArticle,
	StyledImageContainer,
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
	// const timeLeftAlt = printTimeLeftAlt(today, end);

	console.log(item);
	return (
		<StyledArticle key={item.id} onClick={() => navigate(`/itm/${item.id}`)}>
			<StyledImageContainer>
				{item.pictures && <img src={item.pictures[0]} />}
			</StyledImageContainer>
			<StyledInfo>
				<div>
					<StyledTitle>{item.title}</StyledTitle>
					<StyledTimeLeft>{timeLeft}</StyledTimeLeft>
				</div>

				<StyledPrice>{item.currentPrice} €</StyledPrice>
			</StyledInfo>
		</StyledArticle>
	);
};

const printTimeLeft = timeSpan => {
	const daysLeft = Math.floor(timeSpan / 86400000);
	// const hoursLeft = Math.floor((timeSpan % 86400000) / 3600000);
	// const minutesLeft = Math.floor((timeSpan % 3600000) / 60000);

	if (timeSpan <= 0) {
		return 'Finalizado';
	}
	// 5 minutos
	if (timeSpan <= 300000) {
		return '¡Termina en unos minutos!';
	}
	// 1 hora
	if (timeSpan <= 3600000) {
		return 'Termina pronto';
	}
	// 1 día
	if (timeSpan <= 86400000) {
		return 'Termina hoy';
	}
	if (daysLeft === 1) {
		return `Termina en ${daysLeft} día`;
	}
	return `Termina en ${daysLeft} días`;
};

// PRINT TIME LEFT ALTERNATIVO

const printTimeLeftAlt = (today, end) => {
	const timeSpan = end - today;
	const daysLeft = Math.floor(timeSpan / 86400000);

	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);

	const afterTomorrow = new Date();
	afterTomorrow.setDate(afterTomorrow.getDate() + 1);

	// Ha terminado
	if (timeSpan <= 0) {
		return 'Finalizado';
	}

	// Termina en 5 min o menos
	if (timeSpan <= 300000) {
		return '¡Termina en unos minutos!';
	}

	// Termina en 1 hora o menos
	if (timeSpan <= 3600000) {
		return 'Termina pronto';
	}

	// Termina hoy
	if (end.getDate() === today.getDate()) {
		return 'Termina hoy';
	}

	// Termina mañana
	if (tomorrow.getDate() === today.getDate()) {
		return 'Termina mañana';
	}

	// Termina pasado mañana
	if (tomorrow.getDate() === today.getDate()) {
		return 'Termina pasado mañana';
	}

	// Termina en x días
	return `Termina en ${daysLeft} días`;
};

export default SmallItem;

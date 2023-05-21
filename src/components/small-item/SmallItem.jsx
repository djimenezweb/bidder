import { useNavigate } from 'react-router-dom';

const SmallItem = ({ item, today }) => {
	const navigate = useNavigate();
	const end = new Date(item.endDate);
	const timeSpan = end - today;

	const timeLeft = printTimeLeft(timeSpan);

	return (
		<article key={item.id} onClick={() => navigate(`/itm/${item.id}`)}>
			<h3>{item.title}</h3>
			<p>{item.description}</p>
			<p>{item.currentPrice} €</p>
			<p>{timeLeft}</p>
		</article>
	);
};

const printTimeLeft = (timeSpan, setTimeLeft) => {
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
		return `Termina mañana (en ${daysLeft} día)`;
	}
	return `Termina en ${daysLeft} días`;
};

export default SmallItem;

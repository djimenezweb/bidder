import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SmallItem = ({ item, today }) => {
	const [timeLeft, setTimeLeft] = useState('...');
	const navigate = useNavigate();
	const end = new Date(item.endDate);
	const timeSpan = end - today;

	useEffect(() => {
		printTimeLeft(timeSpan, setTimeLeft);
	}, []);

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
		setTimeLeft('Finalizado');
		return;
	}
	// 5 minutos
	if (timeSpan <= 300000) {
		setTimeLeft('¡Termina en unos minutos!');
		return;
	}
	// 1 hora
	if (timeSpan <= 3600000) {
		setTimeLeft('Termina pronto');
		return;
	}
	// 1 día
	if (timeSpan <= 86400000) {
		setTimeLeft('Termina hoy');
		return;
	}
	setTimeLeft(`Termina en ${daysLeft} días`);
};

export default SmallItem;

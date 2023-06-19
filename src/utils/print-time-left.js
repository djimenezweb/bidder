export const printTimeLeft = timeSpan => {
	const daysLeft = Math.floor(timeSpan / 86400000);
	const hoursLeft = Math.floor((timeSpan % 86400000) / 3600000);
	const minutesLeft = Math.floor((timeSpan % 3600000) / 60000);

	if (timeSpan <= 0) {
		return 'Finalizado';
	}
	// 5 minutos
	if (timeSpan <= 300000) {
		return '¡Termina muy pronto!';
	}
	// Menos de 1 hora
	if (timeSpan <= 3600000) {
		return `${minutesLeft} min`;
	}
	// 1 día
	if (timeSpan <= 86400000) {
		return `${hoursLeft} horas`;
	}
	// if (daysLeft === 1) {
	// 	return `${daysLeft} día`;
	// }
	return `${daysLeft}d ${hoursLeft}h`;
};

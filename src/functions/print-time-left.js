export const printTimeLeft = timeSpan => {
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

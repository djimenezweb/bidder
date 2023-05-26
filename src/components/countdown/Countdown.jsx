import { useEffect, useState } from 'react';

const Countdown = ({ endDate }) => {
	const end = new Date(endDate);

	const [message, setMessage] = useState('0d 0h 0m 0s');

	useEffect(() => {
		printDate(setMessage, end);

		const timeoutID = setTimeout(() => printDate(setMessage, end), 1000);
		return () => clearTimeout(timeoutID);
	}, [message]);

	return (
		<div>
			{message ? <p>Termina en: {message}</p> : <p>La subasta ha finalizado</p>}
		</div>
	);
};

const printDate = (setMessage, end) => {
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	const today = new Date();
	const timeSpan = end - today;
	if (timeSpan <= 0) {
		setMessage(null);
		return;
	}
	const daysLeft = Math.floor(timeSpan / day);
	const hoursLeft = Math.floor((timeSpan % day) / hour);
	const minutesLeft = Math.floor((timeSpan % hour) / minute);
	const secondsLeft = Math.floor((timeSpan % minute) / second);
	setMessage(
		daysLeft + 'd ' + hoursLeft + 'h ' + minutesLeft + 'm ' + secondsLeft + 's'
	);
};

export default Countdown;

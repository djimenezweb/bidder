import { useEffect, useState } from 'react';

const Countdown = ({ endDate, setActive }) => {
	const end = new Date(endDate);

	const [message, setMessage] = useState('0d 0h 0m 0s');

	useEffect(() => {
		printDate(setMessage, end, setActive);

		const timeoutID = setTimeout(
			() => printDate(setMessage, end, setActive),
			1000
		);
		return () => clearTimeout(timeoutID);
	}, [message]);

	return <>{message ? `Termina en ${message}` : 'La subasta ha finalizado'}</>;
};

const printDate = (setMessage, end, setActive) => {
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	const today = new Date();
	const timeSpan = end - today;
	if (timeSpan <= 0) {
		setMessage(null);
		setActive(false);
		return;
	}
	const daysLeft = Math.floor(timeSpan / day);
	const hoursLeft = Math.floor((timeSpan % day) / hour);
	const minutesLeft = Math.floor((timeSpan % hour) / minute);
	const secondsLeft = Math.floor((timeSpan % minute) / second);
	setMessage(
		daysLeft +
			' días ' +
			hoursLeft +
			'h ' +
			minutesLeft +
			'm ' +
			secondsLeft +
			's'
	);
};

export default Countdown;

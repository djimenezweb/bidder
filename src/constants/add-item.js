import { v4 } from 'uuid';

export const PICTURE_LIMIT = 10;

export const DURATION = [
	{ id: v4(), value: 0, option: '5 minutos' },
	{ id: v4(), value: 1, option: '1 día' },
	{ id: v4(), value: 3, option: '3 días' },
	{ id: v4(), value: 5, option: '5 días' },
	{ id: v4(), value: 7, option: '1 semana' }
];

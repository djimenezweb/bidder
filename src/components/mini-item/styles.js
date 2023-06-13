import styled from 'styled-components';
import { COLORS } from '../../constants/colors';

const StyledRow = styled.div`
	display: grid;
	grid-template-columns: 3rem 1fr 1fr 1fr;
	grid-template-areas:
		'img tit tit tit'
		'img pri bid tim';
	background-color: ${COLORS.white};
	grid-gap: 0.5rem 0;
	padding: 1rem;
	cursor: pointer;

	&:hover {
		background-color: ${COLORS.gray100};
	}

	&:first-child {
		border-top-left-radius: 0.5rem;
		border-top-right-radius: 0.5rem;
	}

	&:last-child {
		border-bottom-left-radius: 0.5rem;
		border-bottom-right-radius: 0.5rem;
	}

	&:not(:last-child) {
		border-bottom: 1px solid ${COLORS.gray300};
	}

	&:last-child {
		margin-bottom: 2rem;
	}

	@media screen and (min-width: 960px) {
		padding: 0.5rem 1rem;
		grid-template-columns: 2rem 16rem 1fr 1fr 1fr;
		grid-template-areas: 'img tit pri bid tim';
		grid-gap: 0 1rem;
		align-items: center;
		justify-items: end;
	}
`;

const StyledImg = styled.img`
	grid-area: img;
	width: 2rem;
	height: 2rem;
	border-radius: 50%;
	object-fit: cover;
	object-position: center;

	@media screen and (min-width: 960px) {
		justify-self: start;
	}
`;

const StyledTitle = styled.p`
	grid-area: tit;
	margin: 0;
	font-weight: 600;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	${StyledRow}:hover & {
		color: ${COLORS.accent100};
	}

	@media screen and (min-width: 960px) {
		justify-self: start;
	}
`;

const StyledPrice = styled.p`
	grid-area: pri;
	margin: 0;
`;

const StyledCurrency = styled.span`
	color: ${COLORS.gray400};
	font-weight: 200;
`;

const StyledBids = styled.p`
	grid-area: bid;
	margin: 0;
`;

const StyledTimeLeft = styled.p`
	grid-area: tim;
	margin: 0;
`;

export {
	StyledImg,
	StyledRow,
	StyledTitle,
	StyledPrice,
	StyledBids,
	StyledCurrency,
	StyledTimeLeft
};

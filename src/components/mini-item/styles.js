import styled from 'styled-components';

const StyledImg = styled.img`
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	object-fit: cover;
	object-position: center;
`;

const StyledRow = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	cursor: pointer;
`;

const StyledTitle = styled.p`
	flex-basis: 10rem;
`;
const StyledPrice = styled.p`
	flex-basis: 6rem;
`;
const StyledBids = styled.p`
	flex-basis: 6rem;
`;
const StyledTimeLeft = styled.p`
	flex-basis: 12rem;
`;
export {
	StyledImg,
	StyledRow,
	StyledTitle,
	StyledPrice,
	StyledBids,
	StyledTimeLeft
};

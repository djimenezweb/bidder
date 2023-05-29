import styled from 'styled-components';

const StyledImg = styled.img`
	width: 2rem;
	height: 2rem;
	border-radius: 50%;
	object-fit: cover;
	object-position: center;
`;

const StyledRow = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	background-color: white;
	padding: 1rem;
	cursor: pointer;

	&:not(:last-child) {
		border-bottom: 1px solid lightgray;
	}

	&:last-child {
		margin-bottom: 2rem;
	}

	@media screen and (min-width: 960px) {
		padding: 0.5rem 1rem;
		flex-direction: row;
		align-items: center;
		gap: 1.5rem;
	}
`;

const StyledTitle = styled.div`
	display: flex;
	align-items: center;
	gap: 1.5rem;
	@media screen and (min-width: 960px) {
		flex: 1 0 12rem;
	}

	span {
		font-weight: 600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

const StyledFlexContainer = styled.div`
	display: flex;
	flex: 1 0 auto;
	margin: 0 0 0 4.5rem;
	gap: 2rem;
	@media screen and (min-width: 960px) {
		margin: 0;
		flex-direction: row;
		align-items: center;
		gap: 1.5rem;
	}
`;

const StyledCell = styled.p`
	margin: 0;
	text-align: right;
	@media screen and (min-width: 960px) {
		flex-basis: 7rem;
	}
`;

const StyledCurrency = styled.span`
	opacity: 0.5;
`;

const StyledTimeLeft = styled.p`
	margin: 0 0 0 4.5rem;
	@media screen and (min-width: 960px) {
		margin: 0;
		flex: 1 0 auto;
	}
`;
export {
	StyledImg,
	StyledRow,
	StyledTitle,
	StyledFlexContainer,
	StyledCell,
	StyledCurrency,
	StyledTimeLeft
};

import styled from 'styled-components';
import { FONTS } from '../../constants/fonts';

const StyledGrid = styled.div`
	@media screen and (min-width: 768px) {
		display: grid;
		gap: 3rem;
		grid-template-columns: 400px 1fr;
	}
`;

const StyledTitle = styled.h2`
	margin: 0 0 2rem;
	font-size: 2.5rem;
	line-height: 1;
	font-weight: 500;
`;

const StyledId = styled.p`
	margin: 0;
	font-size: 0.8rem;
	font-style: 0.5rem;
	font-weight: 200;
	opacity: 0.8;
`;

const StyledFlexContainer = styled.div`
	display: flex;
	gap: 1rem;
	justify-content: start;
	align-items: center;
`;

const StyledPrice = styled.p`
	font-family: ${FONTS.sans};
	margin: 0;
	font-size: 3rem;
	font-weight: 500;
`;

const StyledBids = styled.p`
	margin: 0;
	font-size: 1.5rem;
	font-weight: 400;
	opacity: 0.8;
`;

// Contenedor de fotos

const StyledActivePicture = styled.img`
	width: 100%;
	aspect-ratio: 1.25;
	object-fit: contain;

	@media screen and (min-width: 640px) {
		aspect-ratio: auto;
	}
`;

const StyledThumbnailContainer = styled.div`
	display: flex;
	gap: 0.5rem;
	overflow-x: scroll;
`;

const StyledThumbnail = styled.img`
	border: ${({ active }) =>
		active ? '2px solid blue' : '2px solid transparent'};
	width: 5rem;
	height: 5rem;
	object-fit: cover;
	object-position: center;
`;

const StyledDotContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
`;

const StyledDot = styled.div`
	width: ${({ active }) => (active ? '16px' : '8px')};
	aspect-ratio: 1;
	border-radius: 50%;
	background-color: grey;
	cursor: pointer;
`;

export {
	StyledGrid,
	StyledTitle,
	StyledId,
	StyledFlexContainer,
	StyledPrice,
	StyledBids,
	StyledActivePicture,
	StyledThumbnailContainer,
	StyledThumbnail,
	StyledDotContainer,
	StyledDot
};

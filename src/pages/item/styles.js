import styled from 'styled-components';
import { BOX_SHADOWS, COLORS, PLACE_BID } from '../../constants/styles';

const StyledGrid = styled.div`
	padding: 2rem 0;
	@media screen and (min-width: 768px) {
		display: grid;
		gap: 2rem;
		grid-template-columns: 384px 1fr;
	}

	@media screen and (min-width: 960px) {
		display: grid;
		gap: 3rem;
		grid-template-columns: 36rem 1fr;
	}
`;

const StyledTitle = styled.h2`
	margin: 0 0 2rem;
	font-size: 2.5rem;
	line-height: 1;
	font-weight: 500;
`;

const StyledList = styled.ul`
	display: flex;
	justify-content: start;
	align-items: stretch;
	gap: ${PLACE_BID.gap};
`;

const StyledListItem = styled.li`
	margin: 0 0 ${PLACE_BID.gap} 0;
	width: ${PLACE_BID.width};
	height: ${PLACE_BID.height};
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.5rem;
	border: 1px solid ${COLORS.gray300};
	border-radius: 0.5rem;
	// box-shadow: ${BOX_SHADOWS.small};
`;

const StyledCurrency = styled.span`
	opacity: 0.5;
`;

// Contenedor de fotos

const StyledActivePicture = styled.img`
	width: 100%;
	aspect-ratio: 1.25;
	object-fit: contain;
	box-shadow: ${BOX_SHADOWS.default};
	border-radius: 0.5rem;
	cursor: pointer;
	background-color: ${COLORS.white};

	@media screen and (min-width: 640px) {
		aspect-ratio: 1.33;
	}
`;

const StyledThumbnailContainer = styled.div`
	display: flex;
	gap: 0.5rem;
	overflow-x: scroll;
`;

const StyledDotContainer = styled.div`
	margin-top: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
`;

const StyledDot = styled.div`
	background-color: ${({ active }) =>
		active ? `${COLORS.gray400}` : 'transparent'};
	width: 8px;
	aspect-ratio: 1;
	border-radius: 50%;
	border: 1px solid ${COLORS.gray400};
	cursor: pointer;
`;

export {
	StyledGrid,
	StyledTitle,
	StyledList,
	StyledListItem,
	StyledCurrency,
	StyledActivePicture,
	StyledThumbnailContainer,
	StyledDotContainer,
	StyledDot
};

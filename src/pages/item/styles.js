import styled from 'styled-components';
import { BOX_SHADOWS, COLORS } from '../../constants/colors';

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
		grid-template-columns: 32rem 1fr;
	}
`;

const StyledTitle = styled.h2`
	margin: 0 0 2rem;
	font-size: 2.5rem;
	line-height: 1;
	font-weight: 500;
	color: ${COLORS.accent300};
`;

const StyledDetailsGrid = styled.div`
	width: min(100%, 46rem);
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: 3rem;
	place-items: stretch stretch;
	gap: 1rem;

	@media screen and (min-width: 960px) {
		grid-auto-rows: 4rem;
	}
`;

const StyledGridItem = styled.div`
	margin: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.25rem;
	border: 1px solid ${COLORS.gray300};
	border-radius: 0.5rem;
	// box-shadow: ${BOX_SHADOWS.small};

	@media screen and (min-width: 960px) {
		font-size: 1.5rem;
	}
`;

const StyledCurrency = styled.span`
	opacity: 0.5;
`;

const StyledGridItem2Cols = styled(StyledGridItem)`
	grid-column: span 2;
	font-size: 1rem;
	gap: 0.5rem;

	@media screen and (min-width: 960px) {
		font-size: 1.25rem;
	}
`;

const StyledStatusContainer = styled(StyledGridItem2Cols)`
	background-color: ${({ backgroundColor }) =>
		backgroundColor || 'transparent'};
	border: 1px solid ${({ borderColor }) => borderColor || COLORS.gray300};
	color: ${({ foregroundColor }) => foregroundColor || 'inherit'};
`;

const StyledSpecialButton = styled.button`
	color: ${COLORS.white};
	font-size: 1rem;
	font-family: inherit;
	font-weight: 400;
	padding: 0.5em 1em;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	border-radius: 0.5rem;
	cursor: pointer;

	@media screen and (min-width: 960px) {
		font-size: 1.25rem;
	}
`;

const StyledEditButton = styled(StyledSpecialButton)`
	background-color: ${COLORS.accent100};
	border: 1px solid ${COLORS.gray300};
	&:hover {
		background-color: ${COLORS.accent100};
	}
	&:disabled {
		background-color: ${COLORS.gray300};
		color: ${COLORS.gray400};
		pointer-events: none;
	}
`;

const StyledDeleteButton = styled(StyledSpecialButton)`
	background-color: ${COLORS.warningBackground};
	border: 1px solid ${COLORS.warningBorder};
	&:hover {
		background-color: ${COLORS.warningForeground};
	}
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

	@media screen and (min-width: 960px) {
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
	StyledDetailsGrid,
	StyledGridItem,
	StyledGridItem2Cols,
	StyledStatusContainer,
	StyledCurrency,
	StyledEditButton,
	StyledDeleteButton,
	StyledActivePicture,
	StyledThumbnailContainer,
	StyledDotContainer,
	StyledDot
};

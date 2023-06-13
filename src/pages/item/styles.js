import styled from 'styled-components';
import { BOX_SHADOWS, COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';

const StyledGrid = styled.div`
	padding: 2rem 0;

	& > :first-child {
		margin-bottom: 2rem;
	}

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

const StyledTitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: start;
	gap: 1rem;
`;

const StyledTitle = styled.h2`
	margin: 0 0 1rem;
	font-size: 2.5rem;
	line-height: 1.3;
	font-weight: 500;
	color: ${COLORS.accent300};
`;

const StyledFavContainer = styled.div`
	cursor: pointer;
	position: relative;
	z-index: 10;
`;

const StyledFavCounter = styled.span`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -40%);
	font-family: ${FONTS.cursive};
	font-size: 1.25rem;
	color: ${({ isFav }) => (isFav ? COLORS.accent200 : COLORS.gray400)};
`;

const StyledName = styled.span`
	color: ${COLORS.accent100};
	font-weight: 800;

	&:hover {
		color: ${COLORS.accent200};
		text-decoration: underline;
	}
`;

const StyledDetailsGrid = styled.div`
	width: min(100%, 46rem);
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: repeat(3, 3rem) minmax(3rem, auto);
	place-items: stretch stretch;
	gap: 1rem;

	@media screen and (min-width: 960px) {
		grid-template-rows: repeat(3, 4rem) minmax(4rem, auto);
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
	color: ${COLORS.gray400};
	// opacity: 0.5;
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
	line-height: 1.1;
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
		background-color: ${COLORS.accent200};
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
	color: ${COLORS.warningForeground};
	&:hover {
		background-color: ${COLORS.warningForeground};
		color: ${COLORS.white};
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
		active ? `${COLORS.accent100}` : 'transparent'};
	width: 8px;
	aspect-ratio: 1;
	border-radius: 50%;
	border: 1px solid ${COLORS.accent100};
	cursor: pointer;
`;

export {
	StyledGrid,
	StyledTitleContainer,
	StyledTitle,
	StyledFavContainer,
	StyledFavCounter,
	StyledName,
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

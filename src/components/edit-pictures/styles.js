import styled from 'styled-components';
import { COLORS } from '../../constants/colors';

const StyledGrid = styled.div`
	margin: 0 0 1rem;
	display: grid;
	grid-template-columns: repeat(auto-fit, 100px);
	gap: 1rem;
`;

const StyledAddPictureButton = styled.div`
	width: 100px;
	height: 100px;
	opacity: 0.5;
	background-color: transparent;
	border: 2px dashed ${COLORS.black};
	border-radius: 0.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 2rem;
	cursor: pointer;

	&:hover {
		opacity: 1;
	}
`;

const StyledPreviewContainer = styled.div`
	cursor: pointer;
	position: relative;

	&:hover::after {
		content: '';
		background-image: url('/assets/images/x-circle-fill.svg');
		background-position: center center;
		background-repeat: no-repeat;
		position: absolute;
		inset: 0;
		background-color: rgba(255 255 255 / 0.5);
		z-index: 10;
	}
`;

const StyledPreview = styled.img`
	width: 100px;
	height: 100px;
	object-fit: cover;
	object-position: center;
`;

const StyledErrorContainer = styled.div`
	margin: 0;
	padding: 0 1rem;
	color: ${COLORS.warningForeground};
	background-color: ${COLORS.warningBackground};
	border: 1px solid ${COLORS.warningBorder};
	border-radius: 8px;
`;

export {
	StyledGrid,
	StyledAddPictureButton,
	StyledPreviewContainer,
	StyledPreview,
	StyledErrorContainer
};

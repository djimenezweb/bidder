import styled from 'styled-components';

const StyledContainer = styled.div`
	background-color: rgb(240, 240, 240);
	padding: 1rem;
`;

const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, 100px);
	gap: 1rem;
`;

const StyledAddPictureButton = styled.div`
	width: 100px;
	height: 100px;
	opacity: 0.5;
	background-color: transparent;
	border: 2px dashed black;
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

export {
	StyledContainer,
	StyledGrid,
	StyledAddPictureButton,
	StyledPreviewContainer,
	StyledPreview
};

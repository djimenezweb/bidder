import styled from 'styled-components';

const StyledContainer = styled.div`
	display: flex;
	gap: 1rem;
`;

const StyledAddPictureButton = styled.div`
	width: 100px;
	height: 100px;
	background-color: pink;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 2rem;
	cursor: pointer;
`;

const StyledPreview = styled.img`
	width: 100px;
	height: 100px;
	object-fit: cover;
	object-position: center;
`;

export { StyledContainer, StyledAddPictureButton, StyledPreview };

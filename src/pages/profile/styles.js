import styled from 'styled-components';

const StyledGrid = styled.div`
	@media screen and (min-width: 640px) {
		display: grid;
		height: 100%;
		grid-template-columns: 18rem 1fr;
		grid-auto-rows: 1fr;
		gap: 2rem;
	}
`;

const StyledFlexContainer = styled.div`
	margin: 0 0 2rem 0;
	display: flex;
	align-items: center;
	gap: 1rem;
	cursor: ${({ pointer }) => (pointer ? 'pointer' : 'arrow')};
`;

const StyledPictureRow = styled.div`
	width: 4rem;
	height: 4rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const StyledProfilePicture = styled.img`
	border-radius: 50%;
`;

const StyledTextRow = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
`;

const StyledStrongSpan = styled.span`
	font-weight: 800;
`;

export {
	StyledGrid,
	StyledFlexContainer,
	StyledPictureRow,
	StyledProfilePicture,
	StyledTextRow,
	StyledStrongSpan
};

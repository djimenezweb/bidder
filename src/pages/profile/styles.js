import styled from 'styled-components';
import { COLORS } from '../../constants/colors';

const StyledGrid = styled.div`
	margin-top: 2rem;
	@media screen and (min-width: 768px) {
		margin-top: 4rem;
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
	cursor: ${({ clickable }) => (clickable ? 'pointer' : 'arrow')};

	&:hover {
		opacity: ${({ clickable }) => (clickable ? 0.7 : 1)};
	}
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
	color: ${COLORS.accent100};
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

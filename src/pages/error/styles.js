import styled from 'styled-components';
import { COLORS } from '../../constants/colors';

const StyledFlexContainer = styled.div`
	margin: 4rem auto 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
`;

const StyledTitle = styled.p`
	margin: 0 0 2rem;
	font-size: 2rem;
`;

const StyledButton = styled.button`
	font-size: 1rem;
	font-weight: 400;
	padding: 0.5em 1em;
	border-radius: 0.5rem;
	background-color: ${COLORS.accent100};
	color: ${COLORS.white};
	border: 1px solid ${COLORS.accent100};

	&:hover {
		background-color: ${COLORS.accent200};
	}
`;

export { StyledFlexContainer, StyledTitle, StyledButton };

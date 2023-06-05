import styled from 'styled-components';
import { FONTS } from '../../constants/fonts';
import { COLORS } from '../../constants/colors';

const StyledButton = styled.button`
	background-color: ${COLORS.accent100};
	color: ${COLORS.white};
	font-size: 1rem;
	font-family: ${FONTS.sans};
	font-weight: 400;
	padding: 0.5em 1em;
	border: none;
	// border: 1px solid ${COLORS.black};
	border-radius: 0.5rem;
	cursor: pointer;

	&:hover {
		opacity: 0.9;
		// background-color: ${COLORS.accent200};
	}

	&:focus {
		outline: 1px solid black;
	}
`;

export { StyledButton };

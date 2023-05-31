import styled from 'styled-components';
import { FONTS } from '../../constants/fonts';
import { COLORS } from '../../constants/styles';

const StyledButton = styled.button`
	background-color: ${COLORS.accent300};
	color: ${COLORS.white};
	font-size: 1rem;
	font-family: ${FONTS.sans};
	font-weight: 400;
	padding: 0.5em 1em;
	border: 1px solid ${COLORS.black};
	cursor: pointer;

	&:hover {
		background-color: ${COLORS.gray300};
	}
`;

export { StyledButton };

import styled from 'styled-components';
import { FONTS } from '../../constants/fonts';

const StyledButton = styled.button`
	background-color: white;
	font-size: 1rem;
	font-family: ${FONTS.sans};
	font-weight: 400;
	padding: 0.5em 1em;
	border: 1px solid black;
	cursor: pointer;

	&:hover {
		background-color: lightgray;
	}
`;

export { StyledButton };

import styled from 'styled-components';
import { COLORS } from '../../constants/styles';
import { FONTS } from '../../constants/fonts';

const StyledInput = styled.input`
	width: 10rem;
	height: 100%;
	padding: 0.5rem 1rem;
	background-color: none;
	border: ${({ invalid }) =>
		invalid ? `1px solid ${COLORS.errorPrimary}` : '1px solid gray'};
	border-radius: 8px;
	font-family: ${FONTS.sans};
	font-size: 1rem;

	&:focus {
		border: 1px solid black;
		outline: none;
	}

	&:autofill {
		background-color: white;
	}
`;

const StyledSubmitButton = styled.button`
	background-color: #6b9ac4;
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

export { StyledInput, StyledSubmitButton };

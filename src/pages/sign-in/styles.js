import styled from 'styled-components';
import { FONTS } from '../../constants/fonts';

const StyledContainer = styled.div`
	width: min(100%, 448px);
	margin: 0 auto;
	padding: 2rem;
`;

const StyledFormField = styled.div`
	position: relative;
`;

const StyledInput = styled.input`
	width: 100%;
	margin: 0 0 2rem 0;
	padding: 0.5rem 1rem;
	background-color: none;
	// border: 1px solid gray;
	border: ${({ invalid }) => (invalid ? '1px solid red' : '1px solid gray')};
	border-radius: 2rem;
	font-family: ${FONTS.sans};
	font-size: 1rem;

	&:focus {
		border: 1px solid black;
		outline: none;
	}

	&:autofill {
		background-color: white;
	}

	&:-webkit-autofill {
		background-color: white;
	}
`;

const StyledError = styled.p`
	position: absolute;
	margin: 0;
	bottom: 0.5rem;
	left: 1.5rem;
	color: red;
`;

export { StyledContainer, StyledFormField, StyledInput, StyledError };

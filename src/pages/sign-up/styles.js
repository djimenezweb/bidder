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
	margin: 0 0 0.5rem 0;
	padding: 0.5rem 1rem;
	background-color: white;
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
	font-size: 0.9rem;
	position: absolute;
	margin: 0;
	top: 0.7rem;
	right: 1rem;
	color: red;
`;

export { StyledContainer, StyledFormField, StyledInput, StyledError };

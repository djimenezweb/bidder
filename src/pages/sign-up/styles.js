import styled from 'styled-components';
import { FONTS } from '../../constants/fonts';
import { BOX_SHADOWS, COLORS } from '../../constants/styles';
import { StyledButton } from '../../components/button/styles';

const StyledBackground = styled.div`
	background-color: rgb(240 240 240);
	min-height: 100vh;
	padding: 5rem;
`;

const StyledContainer = styled.div`
	width: min(100%, 448px);
	margin: 0 auto 1rem;
	padding: 2rem;
	background-color: white;
	border-radius: 8px;
	box-shadow: ${BOX_SHADOWS.default};
`;

const StyledSmallContainer = styled(StyledContainer)`
	text-align: center;
	padding: 1rem 2rem;
	cursor: pointer;
`;

const StyledTitle = styled.h2`
	margin: 0 0 1rem;
`;

const StyledFormField = styled.div`
	position: relative;
`;

const StyledInput = styled.input`
	width: 100%;
	margin: 0 0 1rem 0;
	padding: 0.5rem 1rem;
	background-color: none;
	border: ${({ invalid }) =>
		invalid ? `1px solid ${COLORS.primary.error}` : '1px solid gray'};
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

const StyledSignUpButton = styled(StyledButton)`
	display: block;
	width: 100%;
	margin: 1rem auto 1rem;
`;

const StyledSeparator = styled.p`
	position: relative;
	margin: 2rem auto;
	font-size: 0.875rem;
	text-align: center;

	& span {
		position: relative;
		padding: 0 0.5rem;
		background-color: white;
	}

	&::before {
		content: '';
		position: absolute;
		inset: 0;
		height: 1px;
		margin: auto;
		background-color: gray;
	}
`;

const StyledGoogleSignInButton = styled(StyledButton)`
	display: block;
	width: 100%;
	margin: 0;
`;

const StyledErrorContainer = styled.div`
	margin: 0 0 1rem;
	padding: 0 1rem;
	color: ${COLORS.primary.error};
	border: 1px solid ${COLORS.primary.error};
	background-color: ${COLORS.secondary.error};
`;

export {
	StyledBackground,
	StyledContainer,
	StyledSmallContainer,
	StyledTitle,
	StyledFormField,
	StyledInput,
	StyledSignUpButton,
	StyledSeparator,
	StyledGoogleSignInButton,
	StyledErrorContainer
};

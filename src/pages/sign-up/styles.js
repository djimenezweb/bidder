import styled from 'styled-components';
import { FONTS } from '../../constants/fonts';
import { BOX_SHADOWS, COLORS } from '../../constants/colors';

const StyledContainer = styled.div`
	width: min(100%, 448px);
	margin: 2rem auto 1rem;
	padding: 2rem;
	background-color: ${COLORS.white};
	color: ${COLORS.accent300};
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
		invalid
			? `1px solid ${COLORS.warningBorder}`
			: `1px solid ${COLORS.gray200}`};
	border-radius: 0.5rem;
	font-family: ${FONTS.sans};
	font-size: 1rem;

	&:focus {
		border: 1px solid ${COLORS.accent100};
		outline: none;
	}

	&:autofill {
		background-color: ${COLORS.white};
	}

	&:-webkit-autofill {
		background-color: ${COLORS.white};
	}
`;

const StyledSignUpButton = styled.button`
	display: block;
	width: 100%;
	margin: 1rem auto 1rem;
	padding: 0.5em 1em;
	background-color: ${COLORS.accent100};
	color: ${COLORS.white};
	font-size: 1rem;
	font-family: ${FONTS.sans};
	font-weight: 400;
	border: none;
	border-radius: 0.5rem;

	&:hover {
		background-color: ${COLORS.accent200};
	}

	&:focus {
		outline: 1px solid black;
	}

	&:active {
		background-color: ${COLORS.accentSecondary};
	}
`;

const StyledGoogleSignInButton = styled.button`
	display: block;
	width: 100%;
	margin: 0;
`;

const StyledErrorContainer = styled.div`
	margin: 0 0 1rem;
	padding: 0 1rem;
	color: ${COLORS.warningForeground};
	border-radius: 0.5rem;
	border: 1px solid ${COLORS.warningBorder};
	background-color: ${COLORS.warningBackground};
`;

export {
	StyledContainer,
	StyledSmallContainer,
	StyledTitle,
	StyledFormField,
	StyledInput,
	StyledSignUpButton,
	StyledGoogleSignInButton,
	StyledErrorContainer
};

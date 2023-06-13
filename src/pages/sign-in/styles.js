import styled from 'styled-components';
import { FONTS } from '../../constants/fonts';
import { BOX_SHADOWS, COLORS } from '../../constants/colors';
import { Link } from 'react-router-dom';

const StyledContainer = styled.div`
	width: min(100%, 448px);
	margin: 2rem auto 1rem;
	padding: 1rem;
	background-color: ${COLORS.white};
	color: ${COLORS.accent300};
	border-radius: 0.5rem;
	box-shadow: ${BOX_SHADOWS.default};

	@media screen and (min-width: 36rem) {
		padding: 2rem;
	}
`;

const StyledSmallContainer = styled(StyledContainer)`
	text-align: center;
	padding: 1rem;
	cursor: pointer;

	@media screen and (min-width: 36rem) {
		padding: 1rem 2rem;
	}
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
	color: ${COLORS.accent400};
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

const StyledSignInButton = styled.button`
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

const StyledErrorContainer = styled.div`
	margin: 0 0 1rem;
	padding: 0 1rem;
	color: ${COLORS.warningForeground};
	border-radius: 0.5rem;
	border: 1px solid ${COLORS.warningBorder};
	background-color: ${COLORS.warningBackground};
`;

const StyledLink = styled(Link)`
	display: block;
	font-size: 0.9rem;
	text-align: center;

	&:hover {
		opacity: 0.7;
	}
`;

export {
	StyledContainer,
	StyledSmallContainer,
	StyledTitle,
	StyledFormField,
	StyledInput,
	StyledErrorContainer,
	StyledSignInButton,
	StyledLink
};

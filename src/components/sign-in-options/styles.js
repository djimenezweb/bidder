import styled from 'styled-components';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';

const StyledSeparator = styled.p`
	position: relative;
	margin: 2rem auto;
	font-size: 0.875rem;
	text-align: center;

	& span {
		position: relative;
		padding: 0 0.5rem;
		background-color: ${COLORS.white};
	}

	&::before {
		content: '';
		position: absolute;
		inset: 0;
		height: 1px;
		margin: auto;
		background-color: ${COLORS.gray200};
	}
`;

const StyledButtonsContainer = styled.div`
	display: flex;
	gap: 1rem;
`;

const StyledButton = styled.button`
	position: relative;
	display: block;
	width: 100%;
	margin: 0;
	padding: 0.5em 1em;
	color: ${COLORS.white};
	font-size: 1rem;
	font-family: ${FONTS.sans};
	font-weight: 400;
	border: none;
	border-radius: 0.5rem;
	overflow: hidden;
	z-index: 10;

	&::after {
		content: '';
		position: absolute;
		background-size: contain;
		transform: rotate(20deg);
		transform-origin: center right;
		z-index: -1;
	}

	&:hover {
		opacity: 0.9;
	}

	&:focus {
		outline: 1px solid black;
	}
`;

const StyledGoogleSignInButton = styled(StyledButton)`
	background-color: ${COLORS.googleBlue};

	&::after {
		width: 6rem;
		height: 6rem;
		background-image: url('/assets/images/google-logo.svg');
		bottom: -2rem;
		right: -1.5rem;
	}
`;

const StyledGithubSignInButton = styled(StyledButton)`
	background-color: ${COLORS.gitHubBlack};

	&::after {
		width: 5rem;
		height: 5rem;
		background-image: url('/assets/images/github-logo-white.svg');
		bottom: -1.5rem;
		right: -1rem;
	}
`;

export {
	StyledSeparator,
	StyledButtonsContainer,
	StyledGoogleSignInButton,
	StyledGithubSignInButton
};

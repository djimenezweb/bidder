import styled from 'styled-components';
import { StyledButton } from '../button/styles';
import { COLORS } from '../../constants/styles';

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
		background-color: ${COLORS.gray400};
	}
`;

const StyledButtonsContainer = styled.div`
	display: flex;
	gap: 1rem;
`;

const StyledGoogleSignInButton = styled(StyledButton)`
	position: relative;
	display: block;
	margin: 0;
	background-color: ${COLORS.googleBlue};
	color: ${COLORS.white};
	width: 100%;
	overflow: hidden;
	z-index: 10;

	&::after {
		content: '';
		position: absolute;
		width: 6rem;
		height: 6rem;
		background-image: url('/assets/images/google-logo.svg');
		background-size: contain;
		bottom: -2rem;
		right: -1.5rem;
		transform: rotate(20deg);
		transform-origin: center right;
		z-index: -1;
	}
`;

const StyledGithubSignInButton = styled(StyledButton)`
	position: relative;
	display: block;
	margin: 0;
	background-color: ${COLORS.gitHubBlack};
	color: ${COLORS.white};
	width: 100%;
	overflow: hidden;
	z-index: 10;

	&::after {
		content: '';
		position: absolute;
		width: 5rem;
		height: 5rem;
		background-image: url('/assets/images/github-logo-white.svg');
		background-size: contain;
		bottom: -1.5rem;
		right: -1rem;
		transform: rotate(20deg);
		transform-origin: center right;
		z-index: -1;
	}
`;

export {
	StyledSeparator,
	StyledButtonsContainer,
	StyledGoogleSignInButton,
	StyledGithubSignInButton
};

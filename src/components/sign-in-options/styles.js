import styled from 'styled-components';
import { StyledButton } from '../button/styles';

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

const StyledButtonsContainer = styled.div`
	display: flex;
	gap: 1rem;
`;

const StyledGoogleSignInButton = styled(StyledButton)`
	display: block;
	background-color: #4285f4;
	color: white;
	width: 100%;
	margin: 0;
`;

const StyledGithubSignInButton = styled(StyledButton)`
	display: block;
	background-color: black;
	color: white;
	width: 100%;
	margin: 0;
`;

export {
	StyledSeparator,
	StyledButtonsContainer,
	StyledGoogleSignInButton,
	StyledGithubSignInButton
};

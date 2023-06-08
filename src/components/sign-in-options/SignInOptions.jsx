import { useNavigate } from 'react-router-dom';
import {
	StyledButtonsContainer,
	StyledGithubSignInButton,
	StyledGoogleSignInButton,
	StyledSeparator
} from './styles';
import {
	handleGithubLogin,
	handleGoogleLogin
} from '../../utils/sign-in-providers';
import { AUTH_MESSAGES } from '../../constants/messages';

const SignInOptions = () => {
	const navigate = useNavigate();
	return (
		<>
			<StyledSeparator>
				<span>{AUTH_MESSAGES.signInOptions}</span>
			</StyledSeparator>
			<StyledButtonsContainer>
				<StyledGoogleSignInButton onClick={() => handleGoogleLogin(navigate)}>
					{AUTH_MESSAGES.signInButton}
					<br />
					{AUTH_MESSAGES.wGoogle}
				</StyledGoogleSignInButton>
				<StyledGithubSignInButton onClick={() => handleGithubLogin(navigate)}>
					{AUTH_MESSAGES.signInButton}
					<br />
					{AUTH_MESSAGES.wGitHub}
				</StyledGithubSignInButton>
			</StyledButtonsContainer>
		</>
	);
};

export default SignInOptions;

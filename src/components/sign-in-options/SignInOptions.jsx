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
} from '../../functions/sign-in-providers';

const SignInOptions = () => {
	const navigate = useNavigate();
	return (
		<>
			<StyledSeparator>
				<span>más opciones</span>
			</StyledSeparator>
			<StyledButtonsContainer>
				<StyledGoogleSignInButton onClick={() => handleGoogleLogin(navigate)}>
					Iniciar sesión
					<br />
					con Google
				</StyledGoogleSignInButton>
				<StyledGithubSignInButton onClick={() => handleGithubLogin(navigate)}>
					Iniciar sesión <br />
					con GitHub
				</StyledGithubSignInButton>
			</StyledButtonsContainer>
		</>
	);
};

export default SignInOptions;

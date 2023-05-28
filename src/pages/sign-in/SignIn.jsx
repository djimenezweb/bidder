import { useNavigate } from 'react-router-dom';

// Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase.config';

// Hook Form
import { useForm } from 'react-hook-form';
import { FORM_VALIDATION } from '../../constants/form-validation';

// Styles
import {
	StyledBackground,
	StyledContainer,
	StyledErrorContainer,
	StyledFormField,
	StyledInput,
	StyledSignInButton,
	StyledSmallContainer,
	StyledTitle
} from './styles';
import SignInOptions from '../../components/sign-in-options/SignInOptions';

const SignIn = () => {
	const navigate = useNavigate();
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm({ mode: 'onBlur' });

	return (
		<StyledBackground>
			<StyledContainer>
				<StyledTitle>Inicia sesión</StyledTitle>
				<form onSubmit={handleSubmit((data, e) => onSubmit(data, e, navigate))}>
					<StyledFormField>
						<StyledInput
							type='email'
							placeholder='email'
							{...register('email', FORM_VALIDATION.email)}
							invalid={errors?.email?.message}
						/>
					</StyledFormField>
					<StyledFormField>
						<StyledInput
							type='password'
							placeholder='contraseña'
							{...register('password', FORM_VALIDATION.password)}
							invalid={errors?.password?.message}
						/>
					</StyledFormField>
					{(errors.email || errors.password) && (
						<StyledErrorContainer>
							<p>{errors?.email?.message}</p>
							<p>{errors?.password?.message}</p>
						</StyledErrorContainer>
					)}

					<StyledSignInButton>Iniciar sesión</StyledSignInButton>
				</form>

				<SignInOptions />
			</StyledContainer>
			<StyledSmallContainer onClick={() => navigate('/signup')}>
				¿No tienes cuenta? ¡Regístrate!
			</StyledSmallContainer>
		</StyledBackground>
	);
};

const onSubmit = async (data, e, navigate) => {
	const { email, password } = data;
	try {
		await signInWithEmailAndPassword(auth, email, password);
		navigate('/');
	} catch (err) {
		console.log(err);
		console.log(err.code);
		console.log(err.message);
	}
};

export default SignIn;

import { useNavigate } from 'react-router-dom';

// Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase.config';

// Hook Form
import { useForm } from 'react-hook-form';
import { FORM_VALIDATION } from '../../constants/form-validation';

// Functions
import { handleGoogleLogin } from '../../functions/google-login';

// Components
import Button from '../../components/button/Button';

// Styles
import {
	StyledContainer,
	StyledError,
	StyledFormField,
	StyledInput
} from './styles';

const SignIn = () => {
	const navigate = useNavigate();
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm({ mode: 'onBlur' });
	return (
		<StyledContainer>
			<h2>¡Bienvenido!</h2>
			<form onSubmit={handleSubmit((data, e) => onSubmit(data, e, navigate))}>
				<StyledFormField>
					<StyledInput
						type='email'
						placeholder='email'
						{...register('email', FORM_VALIDATION.email)}
						invalid={errors?.email?.message}
					/>
					<StyledError>{errors?.email?.message}</StyledError>
				</StyledFormField>
				<StyledFormField>
					<StyledInput
						type='password'
						placeholder='contraseña'
						{...register('password', FORM_VALIDATION.password)}
						invalid={errors?.password?.message}
					/>
					<StyledError>{errors?.password?.message}</StyledError>
				</StyledFormField>
				<button>Iniciar sesión</button>
			</form>
			<button onClick={() => handleGoogleLogin(navigate)}>
				Iniciar sesión con Google
			</button>

			<h2>¿Todavía no tienes cuenta?</h2>
			<Button onClick={() => navigate('/signup')}>
				Regístrate (componente)
			</Button>
			<button onClick={() => navigate('/signup')}>
				Regístrate (botón HTML)
			</button>
		</StyledContainer>
	);
};

const onSubmit = async (data, e, navigate) => {
	const { email, password } = data;
	try {
		await signInWithEmailAndPassword(auth, email, password);
		navigate('/');
	} catch (err) {
		console.log(err);
	}
};

export default SignIn;

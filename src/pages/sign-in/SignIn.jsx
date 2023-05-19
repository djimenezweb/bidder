import { useNavigate } from 'react-router-dom';

// Firebase & Google Login
import {
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup
} from 'firebase/auth';
import { auth } from '../../config/firebase.config';

// Hook Form
import { useForm } from 'react-hook-form';
import { FORM_VALIDATION } from '../../constants/form-validation';

const SignIn = () => {
	const navigate = useNavigate();
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm({ mode: 'onBlur' });
	return (
		<>
			<h2>¡Bienvenido!</h2>
			<form onSubmit={handleSubmit((data, e) => onSubmit(data, e, navigate))}>
				<div>
					<input
						type='email'
						placeholder='email'
						{...register('email', FORM_VALIDATION.email)}
					/>
					<span>{errors?.email?.message}</span>
				</div>
				<div>
					<input
						type='password'
						placeholder='contraseña'
						{...register('password', FORM_VALIDATION.password)}
					/>
					<span>{errors?.password?.message}</span>
				</div>
				<button>Iniciar sesión</button>
			</form>
			<button onClick={handleGoogleLogin}>Iniciar sesión con Google</button>
			<button>Iniciar sesión con xxxxx</button>

			<h2>¿Todavía no tienes cuenta?</h2>
			<button onClick={() => navigate('/signup')}>Regístrate</button>
		</>
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

const handleGoogleLogin = async () => {
	const provider = new GoogleAuthProvider();
	try {
		const result = await signInWithPopup(auth, provider);
		const credential = GoogleAuthProvider.credentialFromResult(result);
		console.log(credential);
	} catch (err) {
		console.log(err);
	}
};

export default SignIn;

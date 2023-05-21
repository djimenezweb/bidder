import { useNavigate } from 'react-router-dom';

// Firebase & Google Login
import {
	GoogleAuthProvider,
	getAdditionalUserInfo,
	signInWithEmailAndPassword,
	signInWithPopup
} from 'firebase/auth';
import { auth, db } from '../../config/firebase.config';
import { doc, setDoc } from 'firebase/firestore';

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
			<button onClick={() => handleGoogleLogin(navigate)}>
				Iniciar sesión con Google
			</button>

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

const handleGoogleLogin = async navigate => {
	const provider = new GoogleAuthProvider();
	try {
		const result = await signInWithPopup(auth, provider);
		const details = getAdditionalUserInfo(result);
		// const credential = GoogleAuthProvider.credentialFromResult(result);
		// console.log(credential);
		// console.log(details);
		// Si es la primera vez que inicia sesión con Google se crea su perfil en colección de usuarios
		if (details.isNewUser) {
			await setDoc(doc(db, 'users', details.profile.email), {
				myBids: '',
				myItems: '',
				myFavs: ''
			});
		}
		navigate('/');
	} catch (err) {
		console.log(err);
	}
};

export default SignIn;

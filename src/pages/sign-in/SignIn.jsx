import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Firebase & Google Login
import {
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup
} from 'firebase/auth';
import { auth } from '../../config/firebase.config';

const SignIn = () => {
	const navigate = useNavigate();
	const [signinForm, setSigninForm] = useState({ email: '', password: '' });
	return (
		<>
			<h2>¡Bienvenido!</h2>
			<form onSubmit={e => handleSubmit(e, signinForm)}>
				<input
					type='email'
					placeholder='email'
					value={signinForm.email}
					onChange={e =>
						setSigninForm({ ...signinForm, email: e.target.value })
					}
				/>
				<input
					type='password'
					placeholder='contraseña'
					value={signinForm.password}
					onChange={e =>
						setSigninForm({ ...signinForm, password: e.target.value })
					}
				/>
				<button>Iniciar sesión</button>
			</form>
			<button onClick={handleGoogleLogin}>Iniciar sesión con Google</button>
			<button>Iniciar sesión con xxxxx</button>

			<h2>¿Todavía no tienes cuenta?</h2>
			<button onClick={() => navigate('/signup')}>Regístrate</button>
		</>
	);
};

const handleSubmit = async (e, signinForm) => {
	e.preventDefault();
	const { email, password } = signinForm;
	try {
		await signInWithEmailAndPassword(auth, email, password);
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

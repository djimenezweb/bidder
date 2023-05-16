// DUDAS: ¿Cómo hacer para que no se muestre "Las contraseñas no coinciden"?
// ¿Cómo impedir que se guarde usuario y contraseña en el formulario de sign up?

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
	const navigate = useNavigate();
	const [registerForm, setRegisterForm] = useState({
		email: '',
		password: '',
		confirmPassword: ''
	});
	const [passwordError, setPasswordError] = useState(false);

	return (
		<>
			<h2>Crear cuenta</h2>
			<form
				onSubmit={e =>
					handleSubmit(e, registerForm, setRegisterForm, setPasswordError)
				}
				autoComplete='off'
			>
				<input
					type='email'
					placeholder='email'
					value={registerForm.email}
					onChange={e =>
						setRegisterForm({ ...registerForm, email: e.target.value })
					}
				/>
				<input
					type='password'
					placeholder='contraseña'
					value={registerForm.password}
					onChange={e =>
						setRegisterForm({ ...registerForm, password: e.target.value })
					}
				/>
				<input
					type='password'
					placeholder='repite tu contraseña'
					value={registerForm.confirmPassword}
					onChange={e =>
						setRegisterForm({
							...registerForm,
							confirmPassword: e.target.value
						})
					}
				/>
				{passwordError && <span>Las contraseñas no coinciden</span>}
				<button>Crear cuenta</button>
			</form>
			<button>Iniciar sesión con Google</button>

			<h2>¿Ya tienes una cuenta?</h2>
			<button onClick={() => navigate('/signin')}>Inicia sesión</button>
		</>
	);
};

const handleSubmit = async (
	e,
	registerForm,
	setRegisterForm,
	setPasswordError
) => {
	e.preventDefault();
	const { email, password, confirmPassword } = registerForm;
	if (password !== confirmPassword) {
		setPasswordError(true);
		setRegisterForm({ ...registerForm, password: '', confirmPassword: '' });
		return;
	}
	try {
		await createUserWithEmailAndPassword(auth, email, password);
		setRegisterForm({ email: '', password: '', confirmPassword: '' });
	} catch (err) {
		console.log(err);
	}
};

export default SignUp;

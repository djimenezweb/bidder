// Firebase
// import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { auth } from '../../config/firebase.config';

// Router
import { useNavigate } from 'react-router-dom';

// Hook Form
import { useForm } from 'react-hook-form';
import { SIGN_UP_VALIDATION } from '../../constants/form-validation';

const SignUp = () => {
	const navigate = useNavigate();
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm();

	console.log(errors);

	return (
		<>
			<h2>Crear cuenta</h2>
			<form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
				<div>
					<input
						type='text'
						name='newDisplayName'
						id='newDisplayName'
						autoComplete='off'
						placeholder='nombre de usuario'
						{...register('newDisplayName', SIGN_UP_VALIDATION.name)}
					/>
					<span>{errors?.newDisplayName?.message}</span>
				</div>
				<div>
					<input
						type='email'
						name='newEmail'
						id='newEmail'
						autoComplete='off'
						placeholder='email'
						{...register('newEmail', SIGN_UP_VALIDATION.email)}
					/>
					<span>{errors?.newEmail?.message}</span>
				</div>
				<div>
					<input
						type='password'
						name='newPassword'
						id='newPassword'
						autoComplete='new-password'
						placeholder='contraseña'
						{...register('newPassword', SIGN_UP_VALIDATION.password)}
					/>
					<span>{errors?.newPassword?.message}</span>
				</div>
				<div>
					<input
						type='password'
						name='repeatPassword'
						id='repeatPassword'
						autoComplete='new-password'
						placeholder='repite tu contraseña'
						{...register('repeatPassword', {
							required: 'Es obligatorio comprobar la contraseña'
						})}
					/>
					<span>Span para error</span>
				</div>
				<button>Crear cuenta</button>
			</form>

			<h2>¿Ya tienes una cuenta?</h2>
			<button onClick={() => navigate('/signin')}>Inicia sesión</button>
			<button>Iniciar sesión con Google</button>
		</>
	);
};

// Para hacer pruebas sin enviar información a Firebase:
const onSubmit = (data, e) => {
	console.log('Formulario válido');
	console.log(data);
	console.log(e);
};

/* const onSubmit = async (data, e) => {
	try {
		await createUserWithEmailAndPassword(auth, data.newEmail, data.newPassword);
		await updateProfile(auth.currentUser, {
			displayName: data.newDisplayName,
			photoURL: 'http://prueba.jpg'
		});
	} catch (err) {
		console.log(err);
	}
}; */

export default SignUp;

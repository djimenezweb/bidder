// Firebase
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../config/firebase.config';
import { doc, setDoc } from 'firebase/firestore';

// Router
import { useNavigate } from 'react-router-dom';

// Hook Form
import { useForm } from 'react-hook-form';
import {
	FORM_VALIDATION,
	validatePasswords
} from '../../constants/form-validation';

const SignUp = () => {
	const navigate = useNavigate();
	const {
		handleSubmit,
		register,
		getValues,
		formState: { errors }
	} = useForm();

	console.log(errors);

	return (
		<>
			<h2>Crear cuenta</h2>
			<form
				onSubmit={handleSubmit((data, e) => onSubmit(data, e, navigate))}
				autoComplete='off'
			>
				<div>
					<input
						type='text'
						name='newDisplayName'
						id='newDisplayName'
						autoComplete='off'
						placeholder='nombre de usuario'
						{...register('newDisplayName', FORM_VALIDATION.name)}
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
						{...register('newEmail', FORM_VALIDATION.email)}
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
						{...register('newPassword', FORM_VALIDATION.password)}
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
							required: 'Es obligatorio comprobar la contraseña',
							validate: value => validatePasswords(value, getValues)
						})}
					/>
					<span>{errors?.repeatPassword?.message}</span>
				</div>
				<button>Crear cuenta</button>
			</form>

			<h2>¿Ya tienes una cuenta?</h2>
			<button onClick={() => navigate('/signin')}>Inicia sesión</button>
		</>
	);
};

const onSubmit = async (data, e, navigate) => {
	try {
		await createUserWithEmailAndPassword(auth, data.newEmail, data.newPassword);
		await updateProfile(auth.currentUser, {
			displayName: data.newDisplayName,
			photoURL: 'http://prueba.jpg'
		});
		await setDoc(doc(db, 'users', data.newEmail), {
			myBids: '',
			myItems: '',
			myFavs: ''
		});
		navigate('/');
	} catch (err) {
		console.log(err);
	}
};

export default SignUp;

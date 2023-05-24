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

// Functions
import { handleGoogleLogin } from '../../functions/google-login';
import Button from '../../components/button/Button';
import {
	StyledContainer,
	StyledError,
	StyledFormField,
	StyledInput
} from './styles';

const SignUp = () => {
	const navigate = useNavigate();
	const {
		handleSubmit,
		register,
		getValues,
		formState: { errors }
	} = useForm({ mode: 'onBlur' });

	console.log(errors);

	return (
		<StyledContainer>
			<h2>Crear cuenta</h2>
			<form
				onSubmit={handleSubmit((data, e) => onSubmit(data, e, navigate))}
				autoComplete='off'
			>
				<StyledFormField>
					<StyledInput
						type='text'
						name='newDisplayName'
						id='newDisplayName'
						autoComplete='off'
						placeholder='nombre de usuario'
						{...register('newDisplayName', FORM_VALIDATION.name)}
						invalid={errors?.newDisplayName?.message}
					/>
					<StyledError>{errors?.newDisplayName?.message}</StyledError>
				</StyledFormField>
				<StyledFormField>
					<StyledInput
						type='email'
						name='newEmail'
						id='newEmail'
						autoComplete='off'
						placeholder='email'
						{...register('newEmail', FORM_VALIDATION.email)}
						invalid={errors?.newEmail?.message}
					/>
					<StyledError>{errors?.newEmail?.message}</StyledError>
				</StyledFormField>
				<StyledFormField>
					<StyledInput
						type='password'
						name='newPassword'
						id='newPassword'
						autoComplete='new-password'
						placeholder='contraseña'
						{...register('newPassword', FORM_VALIDATION.password)}
						invalid={errors?.newPassword?.message}
					/>
					<StyledError>{errors?.newPassword?.message}</StyledError>
				</StyledFormField>
				<StyledFormField>
					<StyledInput
						type='password'
						name='repeatPassword'
						id='repeatPassword'
						autoComplete='new-password'
						placeholder='repite tu contraseña'
						{...register('repeatPassword', {
							required: 'Es obligatorio comprobar la contraseña',
							validate: value => validatePasswords(value, getValues)
						})}
						invalid={errors?.repeatPassword?.message}
					/>
					<StyledError>{errors?.repeatPassword?.message}</StyledError>
				</StyledFormField>
				<Button>Crear cuenta</Button>
			</form>

			<Button action={() => handleGoogleLogin(navigate)}>
				Regístrate con Google
			</Button>

			<h2>¿Ya tienes una cuenta?</h2>
			<Button action={() => navigate('/signin')}>Inicia sesión</Button>
		</StyledContainer>
	);
};

const onSubmit = async (data, e, navigate) => {
	try {
		await createUserWithEmailAndPassword(auth, data.newEmail, data.newPassword);
		await updateProfile(auth.currentUser, {
			displayName: data.newDisplayName,
			photoURL:
				'https://firebasestorage.googleapis.com/v0/b/bidder-89e7b.appspot.com/o/defaults%2Fuser-circle-light-96px.png?alt=media&token=15eab190-4efb-4e9d-b20c-bf9f330882ad'
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

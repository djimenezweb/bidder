// Firebase
import {
	createUserWithEmailAndPassword,
	getIdToken,
	updateProfile
} from 'firebase/auth';
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

import {
	StyledContainer,
	StyledErrorContainer,
	StyledFormField,
	StyledInput,
	StyledSignUpButton,
	StyledSmallContainer,
	StyledTitle
} from './styles';
import SignInOptions from '../../components/sign-in-options/SignInOptions';

const SignUp = () => {
	const navigate = useNavigate();
	const {
		handleSubmit,
		register,
		getValues,
		formState: { errors }
	} = useForm({ mode: 'onBlur' });

	return (
		<>
			<StyledContainer>
				<StyledTitle>Crea una cuenta</StyledTitle>
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
					</StyledFormField>

					{Object.keys(errors).length !== 0 && (
						<StyledErrorContainer>
							<p>{errors?.newDisplayName?.message}</p>
							<p>{errors?.newEmail?.message}</p>
							<p>{errors?.newPassword?.message}</p>
							<p>{errors?.repeatPassword?.message}</p>
						</StyledErrorContainer>
					)}

					<StyledSignUpButton>Crear cuenta</StyledSignUpButton>
				</form>
				<SignInOptions />
			</StyledContainer>

			<StyledSmallContainer onClick={() => navigate('/signin')}>
				¿Ya tienes una cuenta? Inicia sesión
			</StyledSmallContainer>
		</>
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
		// Fuerza actualización del token para que se muestre displayName y foto perfil
		await getIdToken(auth.currentUser, true);
		navigate('/');
	} catch (err) {
		console.log(err);
	}
};

export default SignUp;

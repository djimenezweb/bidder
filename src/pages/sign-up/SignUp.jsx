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
import { useState } from 'react';
import { AUTH_MESSAGES } from '../../constants/messages';

const SignUp = () => {
	const navigate = useNavigate();
	const {
		handleSubmit,
		register,
		getValues,
		formState: { errors }
	} = useForm({ mode: 'onBlur' });
	const [authErrors, setAuthErrors] = useState({});

	return (
		<>
			<StyledContainer>
				<StyledTitle>{AUTH_MESSAGES.register}</StyledTitle>
				<form
					onSubmit={handleSubmit((data, e) =>
						onSubmit(data, e, navigate, setAuthErrors)
					)}
					autoComplete='off'
				>
					<StyledFormField>
						<StyledInput
							type='text'
							name='newDisplayName'
							id='newDisplayName'
							autoComplete='off'
							placeholder={AUTH_MESSAGES.userNamePHolder}
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
							placeholder={AUTH_MESSAGES.emailPHolder}
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
							placeholder={AUTH_MESSAGES.passwordPHolder}
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
							placeholder={AUTH_MESSAGES.repeatPasswordPHolder}
							{...register('repeatPassword', {
								required: 'Es obligatorio comprobar la contraseña',
								validate: value => validatePasswords(value, getValues)
							})}
							invalid={errors?.repeatPassword?.message}
						/>
					</StyledFormField>

					{(Object.keys(errors).length !== 0 || authErrors.message) && (
						<StyledErrorContainer>
							<p>{errors?.newDisplayName?.message}</p>
							<p>{errors?.newEmail?.message}</p>
							<p>{errors?.newPassword?.message}</p>
							<p>{errors?.repeatPassword?.message}</p>
							<p>{authErrors?.message}</p>
						</StyledErrorContainer>
					)}

					<StyledSignUpButton>
						{AUTH_MESSAGES.registerButton}
					</StyledSignUpButton>
				</form>
				<SignInOptions />
			</StyledContainer>

			<StyledSmallContainer onClick={() => navigate('/signin')}>
				{AUTH_MESSAGES.signInQuestion}
			</StyledSmallContainer>
		</>
	);
};

const onSubmit = async (data, e, navigate, setAuthErrors) => {
	try {
		await createUserWithEmailAndPassword(auth, data.newEmail, data.newPassword);
		await updateProfile(auth.currentUser, {
			displayName: data.newDisplayName,
			photoURL:
				'https://firebasestorage.googleapis.com/v0/b/bidder-89e7b.appspot.com/o/defaults%2Fuser-circle-light.svg?alt=media&token=0f8102e5-05f1-47f6-acf7-2a50819e99eb'
		});
		await setDoc(doc(db, 'users', data.newEmail), {
			myAuctions: [],
			myItems: [],
			myFavs: []
		});
		// Fuerza actualización del token para que se muestre displayName y foto perfil
		await getIdToken(auth.currentUser, true);
		navigate('/');
	} catch (err) {
		console.log(err);
		setAuthErrors({ message: err.message });
	}
};

export default SignUp;

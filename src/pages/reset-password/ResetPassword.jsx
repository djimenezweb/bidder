import { useNavigate } from 'react-router-dom';

// Firebase
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase.config';

// Hook Form
import { useForm } from 'react-hook-form';
import { FORM_VALIDATION } from '../../constants/form-validation';

// Styles
import {
	StyledContainer,
	StyledErrorContainer,
	StyledFormField,
	StyledInput,
	StyledSignInButton,
	StyledSmallContainer,
	StyledSuccessContainer,
	StyledTitle
} from './styles';
import { useState } from 'react';
import { AUTH_MESSAGES } from '../../constants/messages';

const ResetPassword = () => {
	const navigate = useNavigate();
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm({ mode: 'onBlur' });
	const [authErrors, setAuthErrors] = useState({});
	const [confirm, setConfirm] = useState({});

	return (
		<>
			<StyledContainer>
				<StyledTitle>{AUTH_MESSAGES.resetPassword}</StyledTitle>
				<form
					onSubmit={handleSubmit((data, e) =>
						onSubmit(data, e, setAuthErrors, setConfirm)
					)}
				>
					<StyledFormField>
						<StyledInput
							type='email'
							placeholder={AUTH_MESSAGES.emailPHolder}
							{...register('email', FORM_VALIDATION.email)}
							invalid={errors?.email?.message}
						/>
					</StyledFormField>

					{(errors.email || authErrors.message) && (
						<StyledErrorContainer>
							<p>{errors?.email?.message}</p>
							<p>{authErrors?.message}</p>
						</StyledErrorContainer>
					)}

					{confirm.message && (
						<StyledSuccessContainer>
							<p>{confirm?.message}</p>
						</StyledSuccessContainer>
					)}

					<StyledSignInButton>{AUTH_MESSAGES.resetPassword}</StyledSignInButton>
				</form>
			</StyledContainer>
			<StyledSmallContainer onClick={() => navigate(-1)}>
				{AUTH_MESSAGES.back}
			</StyledSmallContainer>
		</>
	);
};

const onSubmit = async (data, e, setAuthErrors, setConfirm) => {
	setAuthErrors({});
	setConfirm({});
	const { email } = data;
	try {
		await sendPasswordResetEmail(auth, email);
		setConfirm({ message: AUTH_MESSAGES.checkEmail });
	} catch (err) {
		setAuthErrors({ message: err.message });
	}
};

export default ResetPassword;

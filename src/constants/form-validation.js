const messages = {
	invalidName: 'Introduce un nombre válido',
	requiredName: 'El nombre es obligatorio',
	invalidEmail: 'Introduce un email válido',
	requiredEmail: 'El email es obligatorio',
	requiredPassword: 'La contraseña es obligatoria',
	requiredRepeatPassword: 'Es obligatorio comprobar la contraseña',
	shortPassword: 'La contraseña debe tener como mínimo 6 caracteres',
	mismatchPassword: 'Las contraseñas no coinciden'
};

const patterns = {
	name: /^[A-Za-z0-9áéíóúüñç_-]*$/,
	email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
};

export const validatePasswords = (value, getValues) => {
	const password = getValues('newPassword');
	if (password !== value) {
		return 'Las contraseñas no coinciden';
	}

	return true;
};

export const FORM_VALIDATION = {
	name: {
		required: messages.requiredName,
		pattern: { value: patterns.name, message: messages.invalidName }
	},
	email: {
		required: messages.requiredEmail,
		pattern: { value: patterns.email, message: messages.invalidEmail }
	},
	password: {
		required: messages.requiredPassword,
		minLength: { value: 6, message: messages.shortPassword }
	}
};

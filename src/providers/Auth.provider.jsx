import { useEffect, useState } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import { auth } from '../config/firebase.config';

export const AuthProvider = ({ children }) => {
	const [loggedUser, setLoggedUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				// El usuario está autenticado
				setLoggedUser(user);
				console.log('Logged user: ', user.email);
			} else {
				// El usuario no está autenticado
				setLoggedUser(null);
				console.log('User is not logged in');
			}
		});

		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ loggedUser, setLoggedUser }}>
			{children}
		</AuthContext.Provider>
	);
};

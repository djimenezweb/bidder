import { useEffect, useState } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import { auth } from '../config/firebase.config';

export const AuthProvider = ({ children }) => {
	const [loggedUser, setLoggedUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				// El usuario está autenticado
				console.log('User is logged in', user);
				setLoggedUser(user);
			} else {
				// El usuario no está autenticado
				console.log('User is not logged in');
				setLoggedUser(null);
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

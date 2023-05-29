import { useEffect, useState } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import { auth, usersDB } from '../config/firebase.config';
import { doc, getDoc } from 'firebase/firestore';

export const AuthProvider = ({ children }) => {
	const [loggedUser, setLoggedUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = auth.onIdTokenChanged(user => {
			if (user) {
				// El usuario está autenticado
				getUserInfo(user, setLoggedUser, setIsLoading);
				console.log('Logged user: ', user.email);
			} else {
				// El usuario no está autenticado
				setLoggedUser(null);
				console.log('User is not logged in');
				setIsLoading(false);
			}
		});
		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ isLoading, loggedUser, setLoggedUser }}>
			{children}
		</AuthContext.Provider>
	);
};

const getUserInfo = async (user, setLoggedUser, setLoading) => {
	const userRef = doc(usersDB, user.email);
	try {
		const userToRead = await getDoc(userRef);
		const response = userToRead.data();
		setLoggedUser({ ...user, ...response });
		setLoading(false);
	} catch (err) {
		console.error(err);
	}
};

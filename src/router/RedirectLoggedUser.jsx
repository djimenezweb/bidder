import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import { Navigate } from 'react-router-dom';
import { MESSAGES } from '../constants/messages';

const RedirectLoggedUser = ({ children }) => {
	const { isLoading, loggedUser } = useContext(AuthContext);

	if (isLoading) return <p>{MESSAGES.loading}</p>;

	if (!isLoading && loggedUser) {
		return <Navigate to='/' replace />;
	}

	return children;
};

export default RedirectLoggedUser;

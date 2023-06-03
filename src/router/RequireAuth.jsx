import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import { Navigate } from 'react-router-dom';
import { MESSAGES } from '../constants/messages';

const RequireAuth = ({ children }) => {
	const { isLoading, loggedUser } = useContext(AuthContext);

	if (isLoading) return <p>{MESSAGES.loading}</p>;

	if (!isLoading && !loggedUser) {
		return <Navigate to='/signin' replace />;
	}

	return children;
};

export default RequireAuth;

import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
	const { isLoading, loggedUser } = useContext(AuthContext);

	if (isLoading) return <h1>Loading...</h1>;

	if (!isLoading && !loggedUser) {
		return <Navigate to='/signin' replace />;
	}

	return children;
};

export default RequireAuth;

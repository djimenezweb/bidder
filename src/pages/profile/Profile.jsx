import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth.context';

// Firebase
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
	const { loggedUser } = useContext(AuthContext);
	const navigate = useNavigate();

	return (
		<>
			<h2>Perfil de usuario</h2>
			<p>displayName: {loggedUser.displayName}</p>
			<p>email: {loggedUser.email}</p>
			<p>
				email (sin dominio):{' '}
				{loggedUser.email.substring(0, loggedUser.email.indexOf('@'))}
			</p>
			<p>photoURL: {loggedUser.photoURL}</p>
			<img src={loggedUser.photoURL} alt='Profile picture' />
			<p>phoneNumber: {loggedUser.phoneNumber}</p>
			<p>lastSignInTime: {loggedUser.metadata.lastSignInTime}</p>
			<p>lastLoginAt: {loggedUser.metadata.lastLoginAt}</p>
			<p>createdAt: {loggedUser.metadata.createdAt}</p>
			<p>ID: {loggedUser.uid}</p>
			<button onClick={() => logout(navigate)}>Cerrar sesión</button>
		</>
	);
};

const logout = async navigate => {
	await signOut(auth);
	navigate('/');
};

export default Profile;

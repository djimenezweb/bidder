import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth.context';

// Firebase
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
	const { loggedUser } = useContext(AuthContext);
	const navigate = useNavigate();

	return (
		<>
			<h2>{loggedUser.displayName}</h2>
			<p>{loggedUser.email}</p>
			<img src={loggedUser.photoURL} alt='Profile picture' />
			<p>ID: {loggedUser.uid}</p>
			<Link to='/myitems'>Mis anuncios</Link>
			<Link to='/myauctions'>Mis subastas</Link>
			<button onClick={() => logout(navigate)}>Cerrar sesión</button>
		</>
	);
};

const logout = async navigate => {
	await signOut(auth);
	navigate('/');
};

export default Profile;

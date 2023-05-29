import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth.context';

// Firebase
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import { useNavigate } from 'react-router-dom';
import MyItems from '../my-items/MyItems';
import MyAuctions from '../my-auctions/MyAuctions';
import {
	StyledFlexContainer,
	StyledGrid,
	StyledPictureRow,
	StyledProfilePicture,
	StyledStrongSpan,
	StyledTextRow
} from './styles';
import { SignOut } from '@phosphor-icons/react';

const Profile = () => {
	const { loggedUser } = useContext(AuthContext);
	const navigate = useNavigate();

	return (
		<StyledGrid>
			<div>
				<h2>Mi cuenta</h2>
				<StyledFlexContainer>
					<StyledPictureRow>
						<StyledProfilePicture
							src={loggedUser.photoURL}
							alt='Profile picture'
						/>
					</StyledPictureRow>
					<StyledTextRow>
						<StyledStrongSpan>{loggedUser.displayName}</StyledStrongSpan>
						<span>{loggedUser.email}</span>
					</StyledTextRow>
				</StyledFlexContainer>

				<StyledFlexContainer pointer>
					<StyledPictureRow onClick={() => logout(navigate)}>
						<SignOut size={48} />
					</StyledPictureRow>
					<StyledTextRow>
						<span onClick={() => logout(navigate)}>Cerrar sesión</span>
					</StyledTextRow>
				</StyledFlexContainer>
			</div>
			<div>
				<MyItems />
				<MyAuctions />
			</div>
		</StyledGrid>
	);
};

const logout = async navigate => {
	await signOut(auth);
	navigate('/');
};

export default Profile;

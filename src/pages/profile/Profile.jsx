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
import { AUTH_MESSAGES, TITLES } from '../../constants/messages';
import { COLORS } from '../../constants/colors';
import MyFavs from '../my-favs/MyFavs';

const Profile = () => {
	const { loggedUser } = useContext(AuthContext);
	const navigate = useNavigate();

	return (
		<StyledGrid>
			<div>
				<h2>{TITLES.myAccount}</h2>
				<StyledFlexContainer>
					<StyledPictureRow>
						<StyledProfilePicture
							src={loggedUser.photoURL}
							alt='Profile picture'
							referrerpolicy='no-referrer'
						/>
					</StyledPictureRow>
					<StyledTextRow>
						<StyledStrongSpan>{loggedUser.displayName}</StyledStrongSpan>
						<span>{loggedUser.email}</span>
					</StyledTextRow>
				</StyledFlexContainer>

				<StyledFlexContainer clickable>
					<StyledPictureRow onClick={() => logout(navigate)}>
						<SignOut size={48} color={COLORS.black} />
					</StyledPictureRow>
					<StyledTextRow>
						<span onClick={() => logout(navigate)}>
							{AUTH_MESSAGES.signOut}
						</span>
					</StyledTextRow>
				</StyledFlexContainer>
			</div>
			<div>
				<MyItems user={loggedUser.email} title={TITLES.myItems} />
				<MyAuctions />
				<MyFavs />
			</div>
		</StyledGrid>
	);
};

const logout = async navigate => {
	await signOut(auth);
	navigate('/');
};

export default Profile;

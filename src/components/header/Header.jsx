import { Link, NavLink } from 'react-router-dom';
import {
	StyledHeader,
	StyledList,
	StyledMenuButton,
	StyledNav,
	StyledProfileInfo,
	StyledProfilePhoto
} from './styles';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Auth.context';
import Logo from '../logo/Logo';
import { MESSAGES } from '../../constants/messages';

const Header = () => {
	const { loggedUser } = useContext(AuthContext);
	const [openMenu, setOpenMenu] = useState(false);

	return (
		<StyledHeader>
			<StyledNav>
				<Link to='/'>
					<Logo />
				</Link>
				<StyledMenuButton onClick={() => setOpenMenu(!openMenu)}>
					<img
						src={
							openMenu
								? '/assets/images/close-menu.svg'
								: '/assets/images/open-menu.svg'
						}
					/>
				</StyledMenuButton>
				<StyledList openMenu={openMenu}>
					{loggedUser && (
						<li>
							<NavLink
								to='/additem'
								onClick={() => openMenu && setOpenMenu(false)}
							>
								{MESSAGES.addItem}
							</NavLink>
						</li>
					)}

					{loggedUser ? (
						<>
							{/* <li>
								<NavLink to='/profile'>{loggedUser.displayName}</NavLink>
							</li> */}
							<li>
								<StyledProfileInfo
									to='/profile'
									onClick={() => openMenu && setOpenMenu(false)}
								>
									<span>{loggedUser.displayName}</span>
									<StyledProfilePhoto
										src={loggedUser.photoURL}
										alt='Profile picture'
										referrerpolicy='no-referrer'
									/>
								</StyledProfileInfo>
							</li>
						</>
					) : (
						<li>
							<NavLink
								to='/signin'
								onClick={() => openMenu && setOpenMenu(false)}
							>
								Acceder
							</NavLink>
						</li>
					)}
				</StyledList>
			</StyledNav>
		</StyledHeader>
	);
};

export default Header;

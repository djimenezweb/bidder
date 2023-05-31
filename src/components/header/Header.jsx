import { Link, NavLink } from 'react-router-dom';
import {
	StyledHeader,
	StyledList,
	StyledLogo,
	StyledMenuButton,
	StyledNav,
	StyledProfileInfo,
	StyledProfilePhoto
} from './styles';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Auth.context';

const Header = () => {
	const { loggedUser } = useContext(AuthContext);
	const [openMenu, setOpenMenu] = useState(false);

	return (
		<StyledHeader>
			<StyledNav>
				<Link to='/'>
					<StyledLogo>bidder</StyledLogo>
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
								Crear anuncio
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
										alt={loggedUser.displayName}
									/>
								</StyledProfileInfo>
							</li>
						</>
					) : (
						<li>
							<NavLink to='/signin'>Acceder</NavLink>
						</li>
					)}
				</StyledList>
			</StyledNav>
		</StyledHeader>
	);
};

export default Header;

import { Link, NavLink } from 'react-router-dom';
import {
	StyledHeader,
	StyledList,
	StyledLogo,
	StyledNav,
	StyledProfilePhoto
} from './styles';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth.context';

const Header = () => {
	const { loggedUser } = useContext(AuthContext);

	return (
		<StyledHeader>
			<StyledNav>
				<Link to='/'>
					<StyledLogo>bidder</StyledLogo>
				</Link>
				<StyledList>
					{loggedUser && (
						<li>
							<NavLink to='/additem'>Crear anuncio</NavLink>
						</li>
					)}

					{loggedUser ? (
						<>
							<li>
								<NavLink to='/profile'>{loggedUser.displayName}</NavLink>
							</li>
							<li>
								<NavLink to='/profile'>
									<StyledProfilePhoto
										src={loggedUser.photoURL}
										alt={loggedUser.displayName}
									/>
								</NavLink>
							</li>
							<li>
								<NavLink to='/profile'>
									<StyledProfilePhoto
										src='https://firebasestorage.googleapis.com/v0/b/bidder-89e7b.appspot.com/o/defaults%2Fuser-circle-light-96px.png?alt=media&token=15eab190-4efb-4e9d-b20c-bf9f330882ad'
										alt={loggedUser.displayName}
									/>
								</NavLink>
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

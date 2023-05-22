import { Link, NavLink } from 'react-router-dom';
import { StyledHeader, StyledList, StyledLogo, StyledNav } from './styles';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth.context';
import { List } from '@phosphor-icons/react';

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
					<li>
						{loggedUser ? (
							<NavLink to='/profile'>
								{loggedUser.displayName || loggedUser.email}
							</NavLink>
						) : (
							<NavLink to='/signin'>Acceder</NavLink>
						)}
					</li>
					<List size={32} />
				</StyledList>
			</StyledNav>
		</StyledHeader>
	);
};

export default Header;

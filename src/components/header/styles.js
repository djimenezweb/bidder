import styled from 'styled-components';
import { BOX_SHADOWS, COLORS } from '../../constants/colors';
import { NavLink } from 'react-router-dom';

const StyledHeader = styled.header`
	background-color: ${COLORS.light100};
	color: ${COLORS.black};
	padding: 0.5rem 0;

	@media screen and (min-width: 576px) {
		padding: 1rem 0;
	}
`;

const StyledNav = styled.nav`
	width: min(75rem, 100% - 2rem);
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const StyledList = styled.ul`
	display: flex;
	align-items: center;
	gap: 1rem;

	& > *:hover {
		opacity: 0.7;
	}

	@media screen and (max-width: 575.99px) {
		position: fixed;
		top: 3rem;
		right: 0;
		padding: 2rem 3rem;
		border-bottom-left-radius: 0.5rem;
		transform: ${({ openMenu }) =>
			openMenu ? 'translateX(0%)' : 'translateX(100%)'};
		background-color: ${COLORS.light100};
		display: flex;
		flex-direction: column;
		gap: 2rem;
		font-size: 1.25rem;
		box-shadow: ${({ openMenu }) =>
			!openMenu ? 'none' : `${BOX_SHADOWS.smallY};`};

		transition: transform 250ms;
	}
`;

const StyledProfileInfo = styled(NavLink)`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

const StyledProfilePhoto = styled.img`
	width: 2rem;
	height: 2rem;
	background-color: transparent;
	border-radius: 50%;
`;

const StyledMenuButton = styled.button`
	position: relative;
	z-index: 100;
	width: 2rem;
	height: 2rem;
	border: none;
	outline: none;
	background-color: transparent;

	@media screen and (min-width: 576px) {
		display: none;
	}
`;

export {
	StyledHeader,
	StyledNav,
	StyledProfileInfo,
	StyledProfilePhoto,
	StyledList,
	StyledMenuButton
};

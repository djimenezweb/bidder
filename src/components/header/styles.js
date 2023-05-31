import styled from 'styled-components';
import { FONTS } from '../../constants/fonts';
import { COLORS } from '../../constants/colors';

const StyledHeader = styled.header`
	background-color: ${COLORS.gray200};
	padding: 1rem 0;
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
`;

const StyledProfilePhoto = styled.img`
	width: 2rem;
	height: 2rem;
	background-color: ${COLORS.white};
	border-radius: 50%;
`;

const StyledLogo = styled.h1`
	margin: 0;
	font-family: ${FONTS.cursive};
	font-size: 2rem;
	font-weight: 700;
	letter-spacing: auto;
`;

export { StyledHeader, StyledNav, StyledLogo, StyledProfilePhoto, StyledList };

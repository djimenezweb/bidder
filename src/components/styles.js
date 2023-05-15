import styled from 'styled-components';

const StyledHeader = styled.header`
	background-color: rgb(245 245 245);
	padding: 1rem 0;
`;

const StyledNav = styled.nav`
	width: min(75rem, 100% - 2rem);
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const StyledLogo = styled.h1`
	margin: 0;
	font-family: 'Comfortaa', cursive;
	font-size: 2rem;
	font-weight: 700;
	letter-spacing: auto;
`;

const StyledList = styled.ul`
	display: flex;
	gap: 1rem;
`;

export { StyledHeader, StyledNav, StyledLogo, StyledList };

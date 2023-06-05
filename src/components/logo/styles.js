import styled from 'styled-components';
import { FONTS } from '../../constants/fonts';
import { COLORS } from '../../constants/colors';

const StyledLogo = styled.h1`
	margin: 0;
	color: ${COLORS.accent100};
	font-family: ${FONTS.cursive};
	font-size: 1.5rem;
	font-weight: 700;
	letter-spacing: auto;

	&::first-letter {
		color: ${COLORS.accentSecondary};
	}

	@media screen and (min-width: 576px) {
		font-size: 2rem;
	}
`;

export { StyledLogo };

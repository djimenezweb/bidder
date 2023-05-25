import styled from 'styled-components';
import { FONTS } from '../../constants/fonts';

const StyledTitle = styled.h2`
	margin: 2rem 0;
	font-size: 3rem;
	line-height: 1;
	font-weight: 500;
`;

const StyledId = styled.p`
	margin: 0;
	font-style: 0.5rem;
	font-weight: 200;
`;

const StyledPrice = styled.p`
	font-family: ${FONTS.sans};
	margin: 0;
	font-size: 5rem;
	font-weight: 500;
`;

export { StyledTitle, StyledId, StyledPrice };

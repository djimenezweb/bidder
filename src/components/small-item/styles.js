import styled from 'styled-components';
import { BOX_SHADOWS, COLORS } from '../../constants/colors';

const StyledArticle = styled.article`
	padding: 0;
	cursor: pointer;
`;

const StyledImageContainer = styled.div`
	max-width: 100%;
	aspect-ratio: 1;
	background-color: ${COLORS.gray200};
	border-radius: 0.5rem;
	overflow: hidden;
	box-shadow: ${BOX_SHADOWS.default};
`;

const StyledFlexContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const StyledInfo = styled.div`
	flex: 0 1 auto;
	overflow: hidden;
`;

const StyledImg = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
`;

const StyledTitle = styled.h3`
	font-size: 1.125rem;
	margin: 0.5rem 0 0;
	font-weight: 500;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const StyledPrice = styled.p`
	margin: 0;
	font-size: 1.25rem;
	font-weight: 600;
	color: ${COLORS.accent100};

	@media screen and (min-width: 36rem) {
		font-size: 1.5rem;
	}
`;

const StyledCurrency = styled.span`
	font-size: 1.25rem;
	font-weight: 300;

	@media screen and (min-width: 36rem) {
		font-size: 1.5rem;
	}
`;

const StyledFavContainer = styled.div`
	cursor: pointer;
	position: relative;
	z-index: 10;
`;

const StyledBids = styled.p`
	margin: 0;
	font-size: 0.9rem;
	font-weight: 600;
	color: ${COLORS.accent300};
`;

const StyledTimeLeft = styled.span`
	font-weight: 400;
	color: ${({ color }) =>
		color <= 3600000 ? COLORS.accentSecondary : COLORS.accent300};

	&::before {
		content: '·';
		position: relative;
		margin: 0 0.5rem 0;
		font-weight: 600;
	}
`;

export {
	StyledArticle,
	StyledImageContainer,
	StyledFlexContainer,
	StyledImg,
	StyledTitle,
	StyledInfo,
	StyledPrice,
	StyledCurrency,
	StyledFavContainer,
	StyledBids,
	StyledTimeLeft
};

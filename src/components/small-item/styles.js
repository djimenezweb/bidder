import styled from 'styled-components';
import { BOX_SHADOWS } from '../../constants/styles';

const StyledArticle = styled.article`
	padding: 0;
	cursor: pointer;
`;

const StyledImageContainer = styled.div`
	max-width: 100%;
	aspect-ratio: 1;
	background-color: rgb(240 240 240);
	border-radius: 0.5rem;
	overflow: hidden;
	box-shadow: ${BOX_SHADOWS.default};
`;

const StyledFlexContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 0.5rem;
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
	font-size: 1.5rem;
	font-weight: 600;
`;

const StyledBids = styled.p`
	margin: 0;
	font-size: 1rem;
	opacity: 0.5;
`;

const StyledTimeLeft = styled.p`
	margin: 0;
	font-size: 0.9rem;
	color: #4059ad;
`;

export {
	StyledArticle,
	StyledImageContainer,
	StyledFlexContainer,
	StyledImg,
	StyledTitle,
	StyledInfo,
	StyledPrice,
	StyledBids,
	StyledTimeLeft
};

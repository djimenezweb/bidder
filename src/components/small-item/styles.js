import styled from 'styled-components';

const StyledArticle = styled.article`
	padding: 0;
	cursor: pointer;
`;

const StyledImageContainer = styled.div`
	max-width: 100%;
	aspect-ratio: 1;
	background-color: rgb(240 240 240);
	border-radius: 1rem;
	overflow: hidden;
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
	margin: 0.5rem 0;
	font-weight: 500;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const StyledTimeLeft = styled.p`
	margin: 0;
	font-size: 1rem;
`;

const StyledPrice = styled.p`
	width: max-content;
	flex: 0 0 auto;
	margin: 0.5rem 0;
	font-size: 2rem;
	font-weight: 600;
`;

export {
	StyledArticle,
	StyledImageContainer,
	StyledFlexContainer,
	StyledImg,
	StyledTitle,
	StyledInfo,
	StyledPrice,
	StyledTimeLeft
};

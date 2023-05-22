import styled from 'styled-components';

const StyledArticle = styled.article`
	padding: 0;
	cursor: pointer;
`;

const StyledImageContainer = styled.div`
	max-width: 100%;
	aspect-ratio: 1;
	background-color: rgb(240 240 240);
`;

const StyledTitle = styled.h3`
	margin: 0;
`;

const StyledInfo = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const StyledPrice = styled.p`
	flex: 0 0 auto;
	margin: 0;
	font-size: 2rem;
	font-weight: 600;
`;

const StyledTimeLeft = styled.p`
	margin: 0;
`;

export {
	StyledArticle,
	StyledImageContainer,
	StyledTitle,
	StyledInfo,
	StyledPrice,
	StyledTimeLeft
};

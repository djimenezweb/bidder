import { SmileyNervous } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { StyledButton, StyledFlexContainer, StyledTitle } from './styles';

const Error = ({ children, type }) => {
	const navigate = useNavigate();

	if (type === 'small') {
		return (
			<StyledFlexContainer>
				<SmileyNervous size={64} weight='light' />
				<StyledTitle>{children}</StyledTitle>
			</StyledFlexContainer>
		);
	}

	return (
		<StyledFlexContainer>
			<SmileyNervous size={64} weight='light' />
			<StyledTitle>{children}</StyledTitle>
			<StyledButton onClick={() => navigate(-1)}>Volver</StyledButton>
		</StyledFlexContainer>
	);
};

export default Error;

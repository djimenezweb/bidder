import { StyledButton } from './styles';

const Button = ({ action, children }) => {
	return <StyledButton onClick={action}>{children}</StyledButton>;
};

export default Button;

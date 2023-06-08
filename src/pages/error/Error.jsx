import { useNavigate } from 'react-router-dom';
import { StyledButton, StyledFlexContainer, StyledTitle } from './styles';

const Error = ({ children, backButton }) => {
	const navigate = useNavigate();

	return (
		<StyledFlexContainer>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='64'
				height='64'
				fill='currentColor'
				viewBox='0 0 256 256'
			>
				<path d='M180.24,163.76a6,6,0,1,1-8.48,8.48L160,160.49l-11.76,11.75a6,6,0,0,1-8.48,0L128,160.49l-11.76,11.75a6,6,0,0,1-8.48,0L96,160.49,84.24,172.24a6,6,0,0,1-8.48-8.48l16-16a6,6,0,0,1,8.48,0L112,159.51l11.76-11.75a6,6,0,0,1,8.48,0L144,159.51l11.76-11.75a6,6,0,0,1,8.48,0ZM230,128A102,102,0,1,1,128,26,102.12,102.12,0,0,1,230,128Zm-12,0a90,90,0,1,0-90,90A90.1,90.1,0,0,0,218,128ZM92,118a10,10,0,1,0-10-10A10,10,0,0,0,92,118Zm72,0a10,10,0,1,0-10-10A10,10,0,0,0,164,118Z'></path>
			</svg>

			<StyledTitle>{children}</StyledTitle>
			{backButton && (
				<StyledButton onClick={() => navigate(-1)}>Volver</StyledButton>
			)}
		</StyledFlexContainer>
	);
};

export default Error;

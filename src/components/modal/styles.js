import styled from 'styled-components';
import { COLORS } from '../../constants/colors';

const StyledBackground = styled.div`
	position: fixed;
	inset: 0;
	background-color: rgba(0 0 0 / 0.4);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const StyledModal = styled.div`
	max-width: 90%;
	padding: 2rem 2rem 3rem;
	background-color: ${COLORS.white};
	border-radius: 0.5rem;
`;

const StyledButtonContainer = styled.div`
	margin: 2rem 0 0;
	display: flex;
	justify-content: center;
	gap: 1rem;
`;

const StyledButton = styled.button`
	width: 40%;
	font-size: 1rem;
	font-weight: 400;
	padding: 0.5em 1em;
	border-radius: 0.5rem;
`;

const StyledCancelButton = styled(StyledButton)`
	background-color: transparent;
	color: ${COLORS.accent300};
	border: 1px solid ${COLORS.accent300};

	&:hover {
		color: ${COLORS.accent100};
		border: 1px solid ${COLORS.accent100};
	}
`;

const StyledDeleteButton = styled(StyledButton)`
	background-color: ${COLORS.warningBackground};
	color: ${COLORS.warningForeground};
	border: 1px solid ${COLORS.warningBorder};

	&:hover {
		background-color: ${COLORS.warningForeground};
		color: ${COLORS.white};
	}
`;

export {
	StyledBackground,
	StyledModal,
	StyledButtonContainer,
	StyledCancelButton,
	StyledDeleteButton
};

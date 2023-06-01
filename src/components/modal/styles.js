import styled from 'styled-components';
import { COLORS } from '../../constants/colors';

const StyledBackground = styled.div`
	position: fixed;
	inset: 0;
	background-color: rgba(0 0 0 / 0.25);
`;

const StyledModal = styled.div`
	position: absolute;
	width: min(90%, 600px);
	height: 200px;
	inset: 0;
	margin: auto;
	padding: 1rem 2rem;
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
	background-color: ${COLORS.accent300};
	color: ${COLORS.white};
	font-size: 1rem;
	font-weight: 400;
	padding: 0.5em 1em;
	border: 1px solid ${COLORS.black};
`;

const StyledCancelButton = styled(StyledButton)`
	background-color: transparent;
	color: ${COLORS.black};
	border: 1px solid ${COLORS.black};

	&:hover {
		background-color: ${COLORS.gray300};
	}
`;

const StyledDeleteButton = styled(StyledButton)`
	background-color: ${COLORS.warningSecondary};
	color: ${COLORS.white};
	border: 1px solid ${COLORS.warningPrimary};

	&:hover {
		background-color: ${COLORS.warningPrimary};
	}
`;

export {
	StyledBackground,
	StyledModal,
	StyledButtonContainer,
	StyledCancelButton,
	StyledDeleteButton
};

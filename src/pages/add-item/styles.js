import styled from 'styled-components';
import { BOX_SHADOWS, COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';

const StyledContainer = styled.div`
	max-width: 1200px;
	margin: 1rem auto 2rem;
	padding: 1rem;
	background-color: ${COLORS.white};
	border-radius: 8px;
	box-shadow: ${BOX_SHADOWS.default};

	@media screen and (min-width: 36rem) {
		padding: 2rem;
	}
`;

const StyledFormField = styled.div`
	margin: 0 0 1rem;
`;

const StyledLabel = styled.label`
	display: block;
	margin: 0 0 0.5rem;
	font-weight: 600;
`;

const StyledInput = styled.input`
	width: 100%;
	margin: 0;
	padding: 0.5rem 1rem;
	background-color: ${COLORS.white};
	border: ${({ invalid }) =>
		invalid
			? `1px solid ${COLORS.warningBorder}`
			: `1px solid ${COLORS.gray300}`};
	border-radius: 8px;
	font-family: ${FONTS.sans};
	font-size: 1rem;

	&:focus {
		border: 1px solid ${COLORS.accent100};
		outline: none;
	}

	&:hover {
		border: 1px solid ${COLORS.accent100};
	}

	&:autofill {
		background-color: ${COLORS.white};
	}
`;

const StyledFlexContainer = styled.div`
	margin: 0 0 1rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	@media screen and (min-width: 640px) {
		flex-direction: row;
		align-items: flex-end;
		gap: clamp(1rem, 5vw, 4rem);

		& > * {
			flex-shrink: 0;
		}
	}
`;

const StyledInputNumber = styled(StyledInput)`
	width: 8rem;
	margin: 0 1rem 0 0;
`;

const StyledSelect = styled.select`
	width: 8rem;
	margin: 0;
	padding: 0.5rem 1rem;
	background-color: ${COLORS.white};
	border: ${({ invalid }) =>
		invalid
			? `1px solid ${COLORS.warningBorder}`
			: `1px solid ${COLORS.gray300}`};
	border-radius: 8px;
	font-family: ${FONTS.sans};
	font-size: 1rem;

	&:hover {
		border: 1px solid ${COLORS.accent100};
	}

	&:focus {
		border: 1px solid ${COLORS.accent100};
		outline: none;
	}
`;

const StyledDate = styled.p`
	margin: 0;
	padding: 0 0 0.5rem;
	flex-shrink: 1;
`;

const StyledTextarea = styled.textarea`
	resize: none;
	width: 100%;
	min-height: 9rem;
	margin: 0;
	padding: 1rem;
	background-color: ${COLORS.white};
	border: ${({ invalid }) =>
		invalid
			? `1px solid ${COLORS.warningBorder}`
			: `1px solid ${COLORS.gray300}`};
	border-radius: 8px;
	font-family: ${FONTS.sans};
	font-size: 1rem;

	&:focus {
		border: 1px solid ${COLORS.accent100};
		outline: none;
	}

	&:hover {
		border: 1px solid ${COLORS.accent100};
	}
`;

const StyledErrorContainer = styled.div`
	margin: 0;
	padding: 0 1rem;
	color: ${COLORS.warningForeground};
	background-color: ${COLORS.warningBackground};
	border: 1px solid ${COLORS.warningBorder};
	border-radius: 8px;
`;

// Botones

const StyledButtonContainer = styled(StyledContainer)`
	display: flex;
	gap: 1rem;
	justify-content: flex-end;
`;

const StyledButton = styled.button`
	font-size: 1rem;
	font-weight: 400;
	padding: 0.5em 1em;
	border-radius: 0.5rem;
`;

const StyledResetButton = styled(StyledButton)`
	background-color: transparent;
	color: ${COLORS.accent300};
	border: 1px solid ${COLORS.accent300};

	&:hover {
		color: ${COLORS.accent100};
		border: 1px solid ${COLORS.accent100};
	}
`;

const StyledSubmitButton = styled(StyledButton)`
	background-color: ${COLORS.accent100};
	color: ${COLORS.white};
	border: 1px solid ${COLORS.accent100};

	&:hover {
		background-color: ${COLORS.accent200};
	}
`;

export {
	StyledContainer,
	StyledFormField,
	StyledLabel,
	StyledInput,
	StyledInputNumber,
	StyledSelect,
	StyledFlexContainer,
	StyledTextarea,
	StyledDate,
	StyledErrorContainer,
	StyledButtonContainer,
	StyledResetButton,
	StyledSubmitButton
};

import styled from 'styled-components';
import { BOX_SHADOWS, COLORS } from '../../constants/styles';
import { FONTS } from '../../constants/fonts';
import { StyledButton } from '../../components/button/styles';

const StyledContainer = styled.div`
	max-width: 1200px;
	margin: 1rem auto 2rem;
	padding: 2rem;
	background-color: ${COLORS.white};
	border-radius: 8px;
	box-shadow: ${BOX_SHADOWS.default};
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
			? `1px solid ${COLORS.errorPrimary}`
			: `1px solid ${COLORS.gray400}`};
	border-radius: 8px;
	font-family: ${FONTS.sans};
	font-size: 1rem;

	&:focus {
		border: 1px solid ${COLORS.black};
		outline: none;
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
			? `1px solid ${COLORS.errorPrimary}`
			: `1px solid ${COLORS.gray400}`};
	border-radius: 8px;
	font-family: ${FONTS.sans};
	font-size: 1rem;

	&:focus {
		border: 1px solid ${COLORS.black};
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
	min-height: 6.5rem;
	margin: 0;
	padding: 1rem;
	background-color: ${COLORS.white};
	border: ${({ invalid }) =>
		invalid
			? `1px solid ${COLORS.errorPrimary}`
			: `1px solid ${COLORS.gray400}`};
	border-radius: 8px;
	font-family: ${FONTS.sans};
	font-size: 1rem;

	&:focus {
		border: 1px solid ${COLORS.black};
		outline: none;
	}
`;

const StyledErrorContainer = styled.div`
	margin: 0;
	padding: 0 1rem;
	color: ${COLORS.errorPrimary};
	background-color: ${COLORS.errorSecondary};
	border: 1px solid ${COLORS.errorPrimary};
	border-radius: 8px;
`;

const StyledResetButton = styled(StyledButton)``;

const StyledSubmitButton = styled(StyledButton)``;

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
	StyledResetButton,
	StyledSubmitButton
};

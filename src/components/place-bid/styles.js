import styled from 'styled-components';
import { COLORS } from '../../constants/colors';

const StyledForm = styled.form`
	grid-column: span 2;
	display: flex;
	gap: 1rem;

	& > * {
		flex: 0 1 50%;
	}
`;

const StyledInput = styled.input`
	padding: 0.5rem 1rem;
	background-color: none;
	border: ${({ invalid }) =>
		invalid
			? `1px solid ${COLORS.warningBorder}`
			: `1px solid ${COLORS.gray300}`};
	border-radius: 0.5rem;
	font-size: 1.5rem;
	text-align: center;

	@media screen and (min-width: 960px) {
		font-size: 2rem;
	}

	&:focus,
	&:hover {
		border: 1px solid ${COLORS.accent100};
		outline: none;
	}

	&:autofill {
		background-color: ${COLORS.white};
	}
`;

const StyledSubmitButton = styled.button`
	background-color: ${COLORS.accent100};
	color: ${COLORS.white};
	font-size: 1.25rem;
	font-family: inherit;
	font-weight: 400;
	padding: 0.5em 1em;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	border: transparent;
	border-radius: 0.5rem;
	cursor: pointer;

	@media screen and (min-width: 960px) {
		font-size: 1.5rem;
	}

	&:hover {
		background-color: ${COLORS.accent200};
	}

	&:active {
		background-color: ${COLORS.accentSecondary};
	}
`;

export { StyledForm, StyledInput, StyledSubmitButton };

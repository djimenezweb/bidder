import styled from 'styled-components';
import { COLORS, PLACE_BID } from '../../constants/colors';

const StyledForm = styled.form`
	display: flex;
	gap: ${PLACE_BID.gap};
`;

const StyledInput = styled.input`
	width: ${PLACE_BID.width};
	height: ${PLACE_BID.height};
	padding: 0.5rem 1rem;
	background-color: none;
	border: ${({ invalid }) =>
		invalid
			? `1px solid ${COLORS.errorPrimary}`
			: `1px solid ${COLORS.gray300}`};
	border-radius: 0.5rem;
	font-size: 2rem;
	text-align: center;

	&:focus,
	&:hover {
		border: 1px solid ${COLORS.black};
		outline: none;
	}

	&:autofill {
		background-color: ${COLORS.white};
	}
`;

const StyledSubmitButton = styled.button`
	width: ${PLACE_BID.width};
	height: ${PLACE_BID.height};
	background-color: ${COLORS.accent300};
	color: ${COLORS.white};
	font-size: 1.5rem;
	font-family: inherit;
	font-weight: 400;
	padding: 0.5em 1em;
	border: 1px solid ${COLORS.gray300};
	border-radius: 0.5rem;
	cursor: pointer;

	&:hover {
		background-color: orange;
	}
`;

export { StyledForm, StyledInput, StyledSubmitButton };

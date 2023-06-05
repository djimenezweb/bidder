import styled from 'styled-components';
import { FONTS } from '../../constants/fonts';
import { BOX_SHADOWS, COLORS } from '../../constants/colors';

const StyledForm = styled.form`
	margin: 1rem 0;
	padding: 1rem 0;
`;

const StyledSearchContainer = styled.div`
	background-color: ${COLORS.white};
	margin-bottom: 2rem;
	display: flex;
	border-radius: 2rem;
	border: ${({ focus }) =>
		focus ? `1px solid ${COLORS.accent100}` : `1px solid ${COLORS.gray300}`};
	overflow: hidden;
	box-shadow: ${BOX_SHADOWS.small};

	&:hover {
		border: 1px solid ${COLORS.accent100};
	}
`;

const StyledSearchButton = styled.button`
	margin: 0 1rem;
	border: transparent;
	background-color: ${COLORS.white};
`;

const StyledInput = styled.input`
	width: 100%;
	height: 3rem;
	border: transparent;
	font-family: ${FONTS.cursive};
	font-size: 2rem;
	font-weight: 200;
	color: ${COLORS.accentSecondary};
	caret-color: ${COLORS.accentSecondary};

	&:focus {
		outline: transparent;
	}
`;

export { StyledForm, StyledSearchContainer, StyledInput, StyledSearchButton };

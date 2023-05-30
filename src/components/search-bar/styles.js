import styled from 'styled-components';
import { FONTS } from '../../constants/fonts';
import { BOX_SHADOWS } from '../../constants/styles';

const StyledForm = styled.form`
	margin: 1rem 0;
	padding: 1rem 0;
`;

const StyledSearchContainer = styled.div`
	background-color: white;
	margin-bottom: 2rem;
	display: flex;
	border-radius: 2rem;
	border: ${({ focus }) => (focus ? '1px solid black' : '1px solid lightgray')};
	overflow: hidden;
	box-shadow: ${BOX_SHADOWS.small};

	&:hover {
		border: 1px solid black;
	}
`;

const StyledSearchButton = styled.button`
	margin: 0 1rem;
	border: transparent;
	background-color: white;
`;

const StyledInput = styled.input`
	width: 100%;
	height: 3rem;
	border: transparent;
	font-family: ${FONTS.cursive};
	font-size: 2rem;
	font-weight: 200;

	&:focus {
		outline: transparent;
	}
`;

export { StyledForm, StyledSearchContainer, StyledInput, StyledSearchButton };

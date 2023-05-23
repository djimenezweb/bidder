import styled from 'styled-components';

const StyledForm = styled.form`
	margin: 1rem 0;
	padding: 1rem 0;
`;

const StyledSearchContainer = styled.div`
	display: flex;
	border-radius: 2rem;
	border: ${({ focus }) => (focus ? '1px solid black' : '1px solid lightgray')};
	overflow: hidden;
`;

const StyledSearchButton = styled.button`
	margin: 0 1rem;
	border: transparent;
	background-color: transparent;
`;

const StyledInput = styled.input`
	width: 100%;
	height: 3rem;
	border: transparent;
	font-family: 'Comfortaa', cursive;
	font-size: 2rem;
	font-weight: 200;

	&:focus {
		outline: transparent;
	}
`;

export { StyledForm, StyledSearchContainer, StyledInput, StyledSearchButton };

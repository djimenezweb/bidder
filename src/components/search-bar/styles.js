import styled from 'styled-components';

const StyledForm = styled.form`
	margin: 1rem 0;
	padding: 1rem 0;
`;

const StyledSearchContainer = styled.div`
	display: flex;
	border-radius: 2rem;
	border: 1px solid grey;
	overflow: hidden;
`;

const StyledInput = styled.input`
	width: 100%;
	height: 3rem;
	border: transparent;
	font-family: 'Comfortaa', cursive;
	font-size: 2rem;
	font-weight: 200;
`;

const StyledSearchButton = styled.button`
	margin: 0 1rem;
	border: transparent;
	background-color: transparent;
`;

export { StyledForm, StyledSearchContainer, StyledInput, StyledSearchButton };

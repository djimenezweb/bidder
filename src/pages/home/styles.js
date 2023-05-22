import styled from 'styled-components';

const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 1.5rem;
`;

export { StyledGrid };

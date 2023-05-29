import styled from 'styled-components';

const StyledGrid = styled.div`
	--cols: 2;
	--gap: 1.5rem;
	display: grid;
	// grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
	gap: var(--gap);

	@media screen and (min-width: 576px) {
		--cols: 3;
		--gap: 2rem;
	}

	@media screen and (min-width: 960px) {
		--cols: 5;
	}
`;

export { StyledGrid };

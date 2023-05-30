import styled from 'styled-components';

const StyledGrid = styled.div`
	--cols: 2;
	--gap: 1.5rem;
	display: grid;
	margin-bottom: 6rem;
	// grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
	gap: var(--gap);

	@media screen and (min-width: 36rem) {
		--cols: 3;
		--gap: 2rem;
	}

	@media screen and (min-width: 58rem) {
		--cols: 4;
		--gap: 2.5rem;
	}

	@media screen and (min-width: 76rem) {
		--cols: 4;
		// --cols: 5;
	}
`;

export { StyledGrid };

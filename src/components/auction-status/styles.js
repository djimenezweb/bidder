import styled from 'styled-components';
import { StyledGridItem } from '../../pages/item/styles';
import { COLORS } from '../../constants/colors';

const StyledGridItem2Cols = styled(StyledGridItem)`
	background-color: ${({ primaryColor }) => primaryColor || 'transparent'};
	border: 1px solid ${({ secondaryColor }) => secondaryColor || COLORS.gray300};
	grid-column: span 2;
	font-size: 1rem;
	gap: 0.5rem;

	@media screen and (min-width: 960px) {
		font-size: 1.25rem;
	}
`;

export { StyledGridItem2Cols };

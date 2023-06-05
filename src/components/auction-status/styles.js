import styled from 'styled-components';
import { COLORS } from '../../constants/colors';

const StyledGridItem2Cols = styled.div`
	margin: 0;
	grid-column: span 2;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	font-size: 1rem;
	border: 1px solid ${COLORS.gray300};
	border-radius: 0.5rem;
	color: ${({ foregroundColor }) => foregroundColor || 'inherit'};
	background-color: ${({ backgroundColor }) =>
		backgroundColor || COLORS.light200};
	border: 1px solid ${({ borderColor }) => borderColor || COLORS.gray300};

	@media screen and (min-width: 960px) {
		font-size: 1.25rem;
	}
`;

export { StyledGridItem2Cols };

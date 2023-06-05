import styled from 'styled-components';
import { COLORS } from '../../constants/colors';
import { motion } from 'framer-motion';

const Loader = () => {
	return (
		<StyledBallContainer>
			<StyledBall custom={0} variants={loaderVariants} animate='animation' />
			<StyledBall custom={1} variants={loaderVariants} animate='animation' />
			<StyledBall custom={2} variants={loaderVariants} animate='animation' />
		</StyledBallContainer>
	);
};

const loaderVariants = {
	animation: custom => ({
		y: [0, -24],
		backgroundColor: [COLORS.accent100, COLORS.accentSecondary],
		transition: {
			duration: 0.6,
			delay: custom * 0.2,
			ease: 'easeOut',
			repeatType: 'reverse',
			repeat: Infinity
		}
	})
};

const StyledBallContainer = styled.div`
	min-height: 16rem;
	display: flex;
	justify-content: start;
	align-items: center;
	gap: 0.5rem;
`;

const StyledBall = styled(motion.div)`
	width: 0.5rem;
	height: 0.5rem;
	background-color: ${COLORS.accent100};
	border-radius: 50%;
`;

export default Loader;

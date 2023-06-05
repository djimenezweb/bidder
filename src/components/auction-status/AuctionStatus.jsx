import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth.context';
import { STATUS } from '../../constants/messages';
import { StyledGridItem2Cols } from './styles';
import { COLORS } from '../../constants/colors';

const AuctionStatus = ({ highestBid, highestBidder, endDate, seller }) => {
	const { loggedUser } = useContext(AuthContext);
	const end = new Date(endDate);
	const today = new Date();
	const timeSpan = end - today;

	if (!loggedUser && timeSpan <= 0) {
		return <></>;
	}

	if (!loggedUser) {
		return <StyledGridItem2Cols>{STATUS.disabled}</StyledGridItem2Cols>;
	}

	if (loggedUser.email === seller && timeSpan <= 0) {
		return <StyledGridItem2Cols>{STATUS.sellerEnded}</StyledGridItem2Cols>;
	}

	if (loggedUser.email === seller) {
		return <StyledGridItem2Cols>{STATUS.seller}</StyledGridItem2Cols>;
	}

	if (highestBid === 0) {
		return <StyledGridItem2Cols>{STATUS.firstBidder}</StyledGridItem2Cols>;
	}

	if (timeSpan <= 0 && highestBidder === loggedUser?.email) {
		return (
			<StyledGridItem2Cols
				foregroundColor={COLORS.successForeground}
				backgroundColor={COLORS.successBackground}
				borderColor={COLORS.successBackground}
			>
				{STATUS.winner}
			</StyledGridItem2Cols>
		);
	}

	if (highestBidder === loggedUser?.email) {
		return (
			<StyledGridItem2Cols
				foregroundColor={COLORS.successForeground}
				backgroundColor={COLORS.successBackground}
				borderColor={COLORS.successBackground}
			>
				{STATUS.highestBidder} {highestBid} EUR.
			</StyledGridItem2Cols>
		);
	}

	if (timeSpan <= 0) {
		return <StyledGridItem2Cols>{STATUS.end}</StyledGridItem2Cols>;
	}

	return <StyledGridItem2Cols>{STATUS.default}</StyledGridItem2Cols>;
};

export default AuctionStatus;

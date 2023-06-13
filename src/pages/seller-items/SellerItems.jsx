import { useParams } from 'react-router-dom';
import { StyledContainer } from './styles';
import MyItems from '../my-items/MyItems';
import { TITLES } from '../../constants/messages';

const SellerItems = () => {
	const { userEmail } = useParams();

	return (
		<StyledContainer>
			<MyItems
				user={userEmail}
				title={
					TITLES.sellerItems + userEmail.substring(0, userEmail.indexOf('@'))
				}
			/>
		</StyledContainer>
	);
};

export default SellerItems;

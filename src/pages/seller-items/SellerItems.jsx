import { useParams } from 'react-router-dom';
import { StyledContainer } from './styles';
import MyItems from '../my-items/MyItems';

const SellerItems = () => {
	const { userEmail } = useParams();

	return (
		<StyledContainer>
			<MyItems
				user={userEmail}
				title={`Los anuncios de ${userEmail.substring(
					0,
					userEmail.indexOf('@')
				)}`}
			/>
		</StyledContainer>
	);
};

export default SellerItems;

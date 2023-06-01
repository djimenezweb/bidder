import { createPortal } from 'react-dom';
import { StyledBackground, StyledModal } from './styles';

const Modal = ({ setModalContent, children }) => {
	if (!children) return;

	return createPortal(
		<StyledBackground>
			<StyledModal>{children}</StyledModal>
		</StyledBackground>,
		document.getElementById('modal')
	);
};

export default Modal;

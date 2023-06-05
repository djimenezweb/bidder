import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Countdown from '../../components/countdown/Countdown';
import { AuthContext } from '../../contexts/Auth.context';
import PlaceBid from '../../components/place-bid/PlaceBid';
import AuctionStatus from '../../components/auction-status/AuctionStatus';
import DeleteItem from '../../components/delete-item/DeleteItem';
import {
	StyledActivePicture,
	StyledCurrency,
	StyledDeleteButton,
	StyledDetailsGrid,
	StyledDot,
	StyledDotContainer,
	StyledEditButton,
	StyledGrid,
	StyledGridItem,
	StyledGridItem2Cols,
	StyledName,
	StyledStatusContainer,
	StyledTitle
} from './styles';
import { ClockCountdown, PencilSimple, XCircle } from '@phosphor-icons/react';
import Modal from '../../components/modal/Modal';
import { COLORS } from '../../constants/colors';
import Loader from '../../components/loader/Loader';

const Item = () => {
	const { itemId } = useParams();
	const [item, setItem] = useState(null);
	const [modalContent, setModalContent] = useState(null);
	const [activePicture, setActivePicture] = useState(0);
	const { loggedUser } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		const unsub = onSnapshot(doc(db, 'items', itemId), doc => {
			const response = doc.data();
			response.pictures.sort((a, b) => {
				if (a < b) return -1;
				if (a > b) return 1;
				return 0;
			});
			setItem(response);
			console.log(response);
		});

		return () => unsub();
	}, []);

	const [status, setStatus] = useState(null);
	const [active, setActive] = useState(true);

	if (!item) return <Loader />;

	return (
		<>
			<StyledGrid>
				{item.pictures && (
					<div>
						<div>
							<StyledActivePicture
								src={item.pictures[activePicture]}
								onClick={() =>
									nextPicture(
										activePicture,
										setActivePicture,
										item.pictures.length
									)
								}
							/>
						</div>
						<StyledDotContainer>
							{item.pictures.map((picture, index) => {
								return (
									<StyledDot
										key={`${itemId}-${index}`}
										onClick={() => setActivePicture(index)}
										active={index === activePicture}
									/>
								);
							})}
						</StyledDotContainer>
					</div>
				)}
				<div>
					<StyledTitle>{item.title}</StyledTitle>
					<p>
						Vendido por{' '}
						<Link to={`/usr/${item.sellerEmail}`}>
							<StyledName>
								{item.sellerEmail.substring(0, item.sellerEmail.indexOf('@'))}
							</StyledName>
						</Link>
					</p>
					<p>{item.description}</p>
					<p>
						La subasta finaliza el {printDate(item.endDate)} a las{' '}
						{printTime(item.endDate)}
					</p>

					<StyledDetailsGrid>
						<StyledGridItem2Cols>
							<ClockCountdown size={24} color={COLORS.accent100} />
							<Countdown endDate={item.endDate} setActive={setActive} />
						</StyledGridItem2Cols>
						<StyledGridItem>
							{Number(item.currentPrice).toLocaleString('es-ES', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})}
							&nbsp;
							<StyledCurrency>EUR</StyledCurrency>
						</StyledGridItem>
						<StyledGridItem>
							{item.bids} {Number(item.bids) === 1 ? 'puja' : 'pujas'}
						</StyledGridItem>

						{/* Si el anuncio está activo, Si HAY loggedUser y NO ES el vendedor, puede PUJAR */}
						{active &&
							loggedUser?.email &&
							loggedUser?.email !== item.sellerEmail && (
								<PlaceBid
									itemId={itemId}
									highestBid={item.highestBid}
									currentPrice={item.currentPrice}
									highestBidder={item.highestBidder}
									bids={item.bids}
									setStatus={setStatus}
								/>
							)}

						{/* Si HAY loggedUser y ES el vendedor, puede EDITAR y BORRAR */}
						{loggedUser?.email && loggedUser?.email === item.sellerEmail && (
							<>
								{/* <DeleteItem itemId={itemId} picturesArray={item.pictures} /> */}
								<StyledDeleteButton
									onClick={() =>
										setModalContent(
											<DeleteItem
												itemId={itemId}
												picturesArray={item.pictures}
												setModalContent={setModalContent}
											/>
										)
									}
								>
									<XCircle size={24} color='currentColor' />
									Borrar anuncio
								</StyledDeleteButton>
								<StyledEditButton
									onClick={() => navigate('edit', { state: item })}
									disabled={!active}
								>
									<PencilSimple size={20} color='currentColor' />
									Editar anuncio
								</StyledEditButton>
							</>
						)}

						{status ? (
							<StyledStatusContainer
								backgroundColor={status.backgroundColor}
								foregroundColor={status.foregroundColor}
								borderColor={status.borderColor}
							>
								{status.text}
							</StyledStatusContainer>
						) : (
							<AuctionStatus
								highestBid={item.highestBid}
								highestBidder={item.highestBidder}
								endDate={item.endDate}
								seller={item.sellerEmail}
							/>
						)}
					</StyledDetailsGrid>
				</div>
			</StyledGrid>
			<Modal setModalContent={setModalContent}>{modalContent}</Modal>
		</>
	);
};

const nextPicture = (activePicture, setActivePicture, length) => {
	if (activePicture === length - 1) {
		setActivePicture(0);
	} else {
		setActivePicture(activePicture + 1);
	}
};

const printDate = date => {
	const dateToPrint = new Date(date);
	return dateToPrint.toLocaleDateString('es-ES', { dateStyle: 'full' });
};

const printTime = date => {
	const timeToPrint = new Date(date);
	return timeToPrint.toLocaleTimeString('es-ES', {
		timeStyle: 'short'
	});
};

export default Item;

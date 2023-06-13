import { useRef } from 'react';
import { v4 } from 'uuid';
import {
	StyledAddPictureButton,
	StyledErrorContainer,
	StyledGrid,
	StyledPreview,
	StyledPreviewContainer
} from './styles';
import { PICTURE_LIMIT } from '../../constants/add-item';
import { deleteObject, ref } from 'firebase/storage';
import { itemsDB, storage } from '../../config/firebase.config';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { MESSAGES, TITLES } from '../../constants/messages';

const EditPictures = ({
	uploadedPictures,
	setUploadedPictures,
	newPictures,
	setNewPictures,
	errors,
	itemId
}) => {
	const inputPictureRef = useRef(null);

	return (
		<>
			<h3>{TITLES.pictures}</h3>
			<p>
				{MESSAGES.pictureLimit} {PICTURE_LIMIT} {MESSAGES.picures}
			</p>
			<StyledGrid>
				{uploadedPictures.length !== 0 &&
					uploadedPictures.map(url => (
						<StyledPreviewContainer
							key={v4()}
							onClick={() =>
								handleDeleteUploadedPicture(
									url,
									uploadedPictures,
									setUploadedPictures,
									itemId
								)
							}
						>
							<StyledPreview src={url} />
						</StyledPreviewContainer>
					))}

				{newPictures.length !== 0 &&
					newPictures.map((picture, index) => (
						<StyledPreviewContainer
							key={v4()}
							onClick={() => handleCancel(index, newPictures, setNewPictures)}
						>
							<StyledPreview src={picture.preview} />
						</StyledPreviewContainer>
					))}

				<div>
					<input
						style={{ display: 'none' }}
						type='file'
						name='picture'
						id='picture'
						ref={inputPictureRef}
						onChange={e =>
							loadPreview(e.target.files[0], newPictures, setNewPictures)
						}
					/>

					{uploadedPictures.length + newPictures.length < PICTURE_LIMIT && (
						<StyledAddPictureButton
							onClick={() => handleClick(inputPictureRef)}
						>
							+
						</StyledAddPictureButton>
					)}
				</div>
			</StyledGrid>

			{errors?.pictures && (
				<StyledErrorContainer>
					<p>{errors?.pictures}</p>
				</StyledErrorContainer>
			)}
		</>
	);
};

const loadPreview = (file, newPictures, setNewPictures) => {
	const reader = new FileReader();

	// reader.onload = e => {console.log(e.target.result);}

	reader.addEventListener('loadend', e => {
		file.preview = e.target.result;
		setNewPictures([...newPictures, file]);
	});
	reader.readAsDataURL(file);
};

const handleClick = inputRef => inputRef.current.click();

const handleDeleteUploadedPicture = async (
	url,
	uploadedPictures,
	setUploadedPictures,
	itemId
) => {
	try {
		// Borrar foto de Storage
		const pictureToDelete = ref(storage, url);
		await deleteObject(pictureToDelete);

		// Nuevo array de url sin la foto eliminada
		const filteredUploadedPictures = uploadedPictures.filter(
			item => item !== url
		);

		// Actualizar array de url del anuncio
		const itemToUpdate = doc(itemsDB, itemId);
		await updateDoc(itemToUpdate, {
			pictures: arrayRemove(url)
		});

		setUploadedPictures(filteredUploadedPictures);
	} catch (err) {
		console.error(err);
	}
};

const handleCancel = (index, newPictures, setNewPictures) => {
	const filteredArray = newPictures.filter(
		(item, stateIndex) => stateIndex !== index
	);
	setNewPictures(filteredArray);
};

export default EditPictures;

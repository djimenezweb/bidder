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
import { MESSAGES, TITLES } from '../../constants/messages';

const UploadPictures = ({ pictures, setPictures, errors }) => {
	const inputPictureRef = useRef(null);

	return (
		<>
			<h3>{TITLES.pictures}</h3>
			<p>
				{MESSAGES.pictureLimit} {PICTURE_LIMIT} {MESSAGES.picures}
			</p>
			<StyledGrid>
				{pictures.length !== 0 &&
					pictures.map((picture, index) => (
						<StyledPreviewContainer
							key={v4()}
							onClick={() => handleCancel(index, pictures, setPictures)}
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
							loadPreview(e.target.files[0], pictures, setPictures)
						}
					/>

					{pictures.length < PICTURE_LIMIT && (
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

const loadPreview = (file, pictures, setPictures) => {
	const reader = new FileReader();

	// reader.onload = e => {console.log(e.target.result);}

	reader.addEventListener('loadend', e => {
		file.preview = e.target.result;
		setPictures([...pictures, file]);
	});
	reader.readAsDataURL(file);
};

const handleClick = inputRef => inputRef.current.click();

const handleCancel = (index, pictures, setPictures) => {
	const filteredArray = pictures.filter(
		(item, stateIndex) => stateIndex !== index
	);
	setPictures(filteredArray);
};

export default UploadPictures;

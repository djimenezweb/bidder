import { useRef } from 'react';
import { v4 } from 'uuid';
import {
	StyledAddPictureButton,
	StyledContainer,
	StyledPreview
} from './styles';

const UploadPictures = ({ pictures, setPictures }) => {
	const inputPictureRef = useRef(null);

	return (
		<StyledContainer>
			{pictures.length !== 0 &&
				pictures.map((picture, index) => (
					<StyledPreview
						key={v4()}
						src={picture.preview}
						onClick={() => handleCancel(index, pictures, setPictures)}
					/>
				))}

			<div>
				<input
					style={{ display: 'none' }}
					type='file'
					name='picture'
					id='picture'
					ref={inputPictureRef}
					onChange={e => loadPreview(e.target.files[0], pictures, setPictures)}
				/>

				{pictures.length < 10 && (
					<StyledAddPictureButton onClick={() => handleClick(inputPictureRef)}>
						+
					</StyledAddPictureButton>
				)}
			</div>
		</StyledContainer>
	);
};

const loadPreview = (file, pictures, setPictures) => {
	const reader = new FileReader();

	reader.addEventListener('loadend', e => {
		file.preview = e.target.result;
		// setPictures({previews: [...pictures.previews, e.target.result], files:[...pictures.files, file]})
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

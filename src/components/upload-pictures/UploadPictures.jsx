import { useRef } from 'react';

const UploadPictures = ({ preview, setPreview }) => {
	const inputPicture0Ref = useRef(null);
	const inputPicture1Ref = useRef(null);
	const inputPicture2Ref = useRef(null);

	return (
		<>
			<div>
				<input
					style={{ display: 'none' }}
					type='file'
					name='picture0'
					id='picture0'
					ref={inputPicture0Ref}
					onChange={e =>
						loadPreview(e.target.files[0], setPreview, preview, 'picture0')
					}
				/>
				{preview.picture0 ? (
					<div
						onClick={() =>
							handleCancel(inputPicture0Ref, setPreview, preview, 'picture0')
						}
					>
						<img src={preview?.picture0} alt='' />
					</div>
				) : (
					<div onClick={() => handleClick(inputPicture0Ref)}>AÑADIR</div>
				)}
			</div>

			<div>
				<input
					style={{ display: 'none' }}
					type='file'
					name='picture1'
					id='picture1'
					ref={inputPicture1Ref}
					onChange={e =>
						loadPreview(e.target.files[0], setPreview, preview, 'picture1')
					}
				/>
				{preview.picture1 ? (
					<div
						onClick={() =>
							handleCancel(inputPicture1Ref, setPreview, preview, 'picture1')
						}
					>
						<img src={preview?.picture1} alt='' />
					</div>
				) : (
					<div onClick={() => handleClick(inputPicture1Ref)}>AÑADIR</div>
				)}
			</div>

			<div>
				<input
					style={{ display: 'none' }}
					type='file'
					name='picture2'
					id='picture2'
					ref={inputPicture2Ref}
					onChange={e =>
						loadPreview(e.target.files[0], setPreview, preview, 'picture2')
					}
				/>
				{preview.picture2 ? (
					<div
						onClick={() =>
							handleCancel(inputPicture2Ref, setPreview, preview, 'picture2')
						}
					>
						<img src={preview?.picture2} alt='' />
					</div>
				) : (
					<div onClick={() => handleClick(inputPicture2Ref)}>AÑADIR</div>
				)}
			</div>
		</>
	);
};

const loadPreview = (file, setPreview, preview, pictureNumber) => {
	const reader = new FileReader();

	reader.addEventListener('loadend', e => {
		console.log(e.target.result);
		setPreview({ ...preview, [pictureNumber]: e.target.result });
	});

	reader.readAsDataURL(file);
};

const handleClick = inputRef => inputRef.current.click();

const handleCancel = (inputRef, setPreview, preview, pictureNumber) => {
	inputRef.current.value = null;
	setPreview({ ...preview, [pictureNumber]: '' });
};

export default UploadPictures;

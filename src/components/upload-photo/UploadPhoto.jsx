import { useRef } from 'react';

const UploadPhoto = () => {
	const inputRef = useRef(null);

	return (
		<>
			<form>
				<input style={{ display: 'none' }} type='file' ref={inputRef} />
			</form>

			<div
				style={{ width: '100px', height: '100px', backgroundColor: 'red' }}
				onClick={() => handleClick(inputRef)}
			></div>
		</>
	);
};

const handleClick = inputRef => {
	inputRef.current.click();
};

export default UploadPhoto;

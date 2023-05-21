import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

// Firebase
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../../contexts/Auth.context';
import { db } from '../../config/firebase.config';

const AddItem = () => {
	const { loggedUser } = useContext(AuthContext);
	const { handleSubmit, register, watch, reset } = useForm({
		defaultValues: {
			title: '',
			startingPrice: 1,
			duration: 1,
			description: ''
		}
	});
	const watchDuration = watch('duration', 1);

	return (
		<>
			<h2>Crear anuncio</h2>
			<form
				onSubmit={handleSubmit((data, e) =>
					onSubmit(data, e, loggedUser, reset)
				)}
			>
				<div>
					<label htmlFor='title'>Título</label>
					<input type='text' name='title' id='title' {...register('title')} />
				</div>
				<div>
					<label htmlFor='startingPrice'>Precio de salida</label>
					<input
						type='text'
						name='startingPrice'
						id='startingPrice'
						{...register('startingPrice')}
					/>{' '}
					€
				</div>
				<div>
					<label htmlFor='duration'>Duración</label>
					<select name='duration' id='duration' {...register('duration')}>
						<option value='1'>1 día</option>
						<option value='3'>3 días</option>
						<option value='5'>5 días</option>
						<option value='7'>1 semana</option>
					</select>
					<p>
						La subasta terminará el {printDate(watchDuration)} a las{' '}
						{printTime()}
					</p>
				</div>
				<div>
					<label htmlFor='description'>Descripción</label>
					<textarea
						name='description'
						id='description'
						{...register('description')}
					></textarea>
				</div>
				<div>
					<input
						type='file'
						name='picture0'
						id='picture0'
						{...register('picture0')}
					/>
					<input
						type='file'
						name='picture1'
						id='picture1'
						{...register('picture1')}
					/>
					<input
						type='file'
						name='picture2'
						id='picture2'
						{...register('picture2')}
					/>
				</div>
				<div>
					<button type='reset'>Borrar</button>
					<button>Publicar anuncio</button>
				</div>
			</form>
		</>
	);
};

export default AddItem;

const onSubmit = (data, e, loggedUser) => {
	console.log(data);
	console.log(data.picture0[0]);
	console.log(data.picture1[0]);
	console.log(data.picture2[0]);
};

const onSubmit2 = async (data, e, loggedUser) => {
	const today = new Date();
	const endDate = new Date();
	endDate.setDate(endDate.getDate() + Number(data.duration));
	const id = v4();
	const userToUpdate = doc(db, 'users', loggedUser.email);
	try {
		await setDoc(doc(db, 'items', id), {
			...data,
			sellerEmail: loggedUser.email,
			sellerID: loggedUser.uid,
			currentPrice: data.startingPrice,
			highestBid: 0,
			highestBidder: '',
			creationDate: today.toISOString(),
			endDate: endDate.toISOString()
		});
		await updateDoc(userToUpdate, { myItems: arrayUnion(id) });
		e.target.reset();
	} catch (err) {
		console.error(err);
	}
};

const printDate = duration => {
	const dateToPrint = new Date();
	dateToPrint.setDate(dateToPrint.getDate() + Number(duration));
	return dateToPrint.toLocaleDateString('es-ES', { dateStyle: 'full' });
};

const printTime = duration => {
	const timeToPrint = new Date();
	return timeToPrint.toLocaleTimeString('es-ES', {
		timeStyle: 'short'
	});
};

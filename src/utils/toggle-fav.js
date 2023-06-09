import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase.config';

const toggleFav = async (loggedUser, setLoggedUser, id, isFav, favs) => {
	const userToUpdate = doc(db, 'users', loggedUser.email);
	const itemToUpdate = doc(db, 'items', id);

	try {
		// No es favorito, por lo tanto hay que inscribir el item como favorito
		if (!isFav) {
			await updateDoc(userToUpdate, { myFavs: arrayUnion(id) });
			await updateDoc(itemToUpdate, { favs: Number(favs) + 1 });
			const newFavs = [...loggedUser.myFavs];
			newFavs.push(id);
			setLoggedUser({ ...loggedUser, myFavs: newFavs });
			return;
		}

		// Ya era favorito, por lo tanto hay que retirarlo
		if (isFav) {
			await updateDoc(userToUpdate, { myFavs: arrayRemove(id) });
			await updateDoc(itemToUpdate, { favs: Number(favs) - 1 });
			const newFavs = loggedUser.myFavs.filter(item => item !== id);
			setLoggedUser({ ...loggedUser, myFavs: newFavs });
			return;
		}
	} catch (err) {
		console.error(err);
	}
};

export const handleFav = (
	e,
	navigate,
	loggedUser,
	setLoggedUser,
	id,
	isFav,
	favs
) => {
	e.stopPropagation();
	if (!loggedUser) {
		navigate('/signin');
		return;
	}

	toggleFav(loggedUser, setLoggedUser, id, isFav, favs);
};

import {
	GithubAuthProvider,
	GoogleAuthProvider,
	getAdditionalUserInfo,
	signInWithPopup
} from 'firebase/auth';
import { auth, db } from '../config/firebase.config';
import { doc, setDoc } from 'firebase/firestore';

export const handleGoogleLogin = async navigate => {
	const provider = new GoogleAuthProvider();
	try {
		const result = await signInWithPopup(auth, provider);
		const details = getAdditionalUserInfo(result);
		// const credential = GoogleAuthProvider.credentialFromResult(result);
		// console.log(credential);
		// console.log(details);
		// Si es la primera vez que inicia sesión con Google se crea su perfil en colección de usuarios
		if (details.isNewUser) {
			await setDoc(doc(db, 'users', details.profile.email), {
				myBids: '',
				myItems: '',
				myFavs: ''
			});
		}
		navigate('/');
	} catch (err) {
		console.log(err);
	}
};

export const handleGithubLogin = async navigate => {
	const provider = new GithubAuthProvider();
	try {
		const result = await signInWithPopup(auth, provider);
		const details = getAdditionalUserInfo(result);
		// const credential = GithubAuthProvider.credentialFromResult(result);
		// const token = credential.accessToken;
		// Si es la primera vez que inicia sesión con Github se crea su perfil en colección de usuarios
		if (details.isNewUser) {
			await setDoc(doc(db, 'users', result.user.email), {
				myBids: '',
				myItems: '',
				myFavs: ''
			});
		}
		navigate('/');
	} catch (err) {
		console.log(err);
	}
};

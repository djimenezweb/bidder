// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyA8H_vuaOabgHTQ6SGuxKDS8-XOqfT3pYA',
	authDomain: 'react-app-1aec5.firebaseapp.com',
	projectId: 'react-app-1aec5',
	storageBucket: 'react-app-1aec5.appspot.com',
	messagingSenderId: '272160009422',
	appId: '1:272160009422:web:c6b37a7d66fda430ea749f'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Cloud Firestore
const db = getFirestore(app);
export const testDB = collection(db, 'test');

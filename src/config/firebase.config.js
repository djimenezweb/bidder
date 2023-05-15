// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDtfJkiod3DT53iocE67GydZpvwYDpHUx0',
	authDomain: 'bidder-89e7b.firebaseapp.com',
	projectId: 'bidder-89e7b',
	storageBucket: 'bidder-89e7b.appspot.com',
	messagingSenderId: '147196669592',
	appId: '1:147196669592:web:a547525470efecbebfaaed'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Cloud Firestore
const db = getFirestore(app);
export const itemsDB = collection(db, 'items');

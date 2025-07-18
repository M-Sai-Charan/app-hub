import { initializeApp, getApps } from "firebase/app";
import { getAuth, RecaptchaVerifier  } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyDVPUgvbYMyTxI9UnASuwHn9uewc5kdKjM",
    authDomain: "app-hub-6119e.firebaseapp.com",
    projectId: "app-hub-6119e",
    storageBucket: "app-hub-6119e.firebasestorage.app",
    messagingSenderId: "657451344904",
    appId: "1:657451344904:web:6c6ffc10af6526c5ec1dbd",
    measurementId: "G-1XHKV70QXR"
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const storage = getStorage(app); 
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db, RecaptchaVerifier, app, storage };
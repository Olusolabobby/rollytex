import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "rollytex-88d8b.firebaseapp.com",
    projectId: "rollytex-88d8b",
    storageBucket: "rollytex-88d8b.appspot.com",
    messagingSenderId: "102708433125",
    appId: "1:102708433125:web:eb79893deba70efa7f440c"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
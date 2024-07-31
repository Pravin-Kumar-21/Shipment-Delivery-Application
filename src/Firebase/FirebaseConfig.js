
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const db = getAuth(app)


// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMW_84OyakMus0TM4Jx5MRZJtOJuGkCcw",
  authDomain: "react-curso-fernando-76fb5.firebaseapp.com",
  projectId: "react-curso-fernando-76fb5",
  storageBucket: "react-curso-fernando-76fb5.appspot.com",
  messagingSenderId: "189371984887",
  appId: "1:189371984887:web:e93224681a7dcee53b1cf2"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASNogj82b1yODPc7U_XgUhCG2CkooN_OU",
  authDomain: "react-journal-fab00.firebaseapp.com",
  projectId: "react-journal-fab00",
  storageBucket: "react-journal-fab00.appspot.com",
  messagingSenderId: "513056068915",
  appId: "1:513056068915:web:0b95590e828ddff3369a46"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
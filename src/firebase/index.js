// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore/lite'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSTBlM3zOvHW1zozFGcBPEOZK4GsRAx1w",
  authDomain: "new-todo-c2fa5.firebaseapp.com",
  projectId: "new-todo-c2fa5",
  storageBucket: "new-todo-c2fa5.appspot.com",
  messagingSenderId: "103567918383",
  appId: "1:103567918383:web:5f81ebade6b463ce648dda",
  measurementId: "G-F0TXX936Z9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
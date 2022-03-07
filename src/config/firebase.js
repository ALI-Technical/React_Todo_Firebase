// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpmKdlOz4Akfy9XSKrj2Dc2LOu6mmanB8",
  authDomain: "ali-awesome-todo.firebaseapp.com",
  projectId: "ali-awesome-todo",
  storageBucket: "ali-awesome-todo.appspot.com",
  messagingSenderId: "882960184163",
  appId: "1:882960184163:web:d662fc9a2453885c7f5956",
  measurementId: "G-W77VV0S5VT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore();

export {db};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYksYZY2lx2gBSigAWFuhujuV1BbzZVvM",
  authDomain: "e-commerce-store-af529.firebaseapp.com",
  projectId: "e-commerce-store-af529",
  storageBucket: "e-commerce-store-af529.firebasestorage.app",
  messagingSenderId: "919289408900",
  appId: "1:919289408900:web:5e9efec482b442751241d1",
  measurementId: "G-LJ6JW7B6FR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const db = getFirestore(app)


export const db = getFirestore(app);

//  default db;
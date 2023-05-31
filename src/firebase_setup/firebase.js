// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1r4pvJbBEK2NPhNS0ry6cIEPP3m0VhqY",
  authDomain: "budgetapp-9ae47.firebaseapp.com",
  projectId: "budgetapp-9ae47",
  storageBucket: "budgetapp-9ae47.appspot.com",
  messagingSenderId: "382697131270",
  appId: "1:382697131270:web:0eca9cfbc011fa3641e287",
  measurementId: "G-TMR7S8VCBC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
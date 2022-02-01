// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYRsMr4NK8QA9Vl6RENpEvh8aNk-xNSKw",
  authDomain: "boost-weather-d3160.firebaseapp.com",
  projectId: "boost-weather-d3160",
  storageBucket: "boost-weather-d3160.appspot.com",
  messagingSenderId: "280309202507",
  appId: "1:280309202507:web:33886b11cf1e8db4b317ce",
  measurementId: "G-EVRJN7S6R4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);



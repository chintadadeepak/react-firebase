// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqApKAJ1v-qy0GjA6JPjL4Qz79P2BtLgE",
  authDomain: "react-firebase-774b5.firebaseapp.com",
  projectId: "react-firebase-774b5",
  storageBucket: "react-firebase-774b5.appspot.com",
  messagingSenderId: "327215004448",
  appId: "1:327215004448:web:6fadcf579eab002420f545"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAFkT1a0TE8FRwd332qxk-jolUofeIl1Wg",
  authDomain: "medium-clone-react-a5ea9.firebaseapp.com",
  projectId: "medium-clone-react-a5ea9",
  storageBucket: "medium-clone-react-a5ea9.appspot.com",
  messagingSenderId: "856383770196",
  appId: "1:856383770196:web:61909cc223b3f06b1567c1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

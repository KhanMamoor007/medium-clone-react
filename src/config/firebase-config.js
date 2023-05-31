// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCUWokV5jtMXb1bvLR4lAfm2UpEd5-9Bpo",
  authDomain: "medium-clone-react-ceadb.firebaseapp.com",
  projectId: "medium-clone-react-ceadb",
  storageBucket: "medium-clone-react-ceadb.appspot.com",
  messagingSenderId: "971368572266",
  appId: "1:971368572266:web:5d62bd528808eb04437113",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

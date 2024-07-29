// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBztcXxX--nUbfVY7TV5oXznZ4l6SJM7KU",
  authDomain: "mysocial-8e712.firebaseapp.com",
  projectId: "mysocial-8e712",
  storageBucket: "mysocial-8e712.appspot.com",
  messagingSenderId: "28334866094",
  appId: "1:28334866094:web:d234bc7dc419c2c113f73f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
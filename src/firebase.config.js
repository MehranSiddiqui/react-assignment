// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAcBIcJxWzMUcOt8aHI9UhyitRZQklsT6o',
  authDomain: "nfx-project.firebaseapp.com",
  projectId: "nfx-project",
  storageBucket: "nfx-project.appspot.com",
  messagingSenderId: "73565670253",
  appId: "1:73565670253:web:7060b72be1930122dda864"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
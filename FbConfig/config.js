import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyDGrVcXgeMFPTi-y4qFS80KxXrZlS72Ryo",
  authDomain: "terrent-178d6.firebaseapp.com",
  projectId: "terrent-178d6",
  storageBucket: "terrent-178d6.appspot.com",
  messagingSenderId: "263783747941",
  appId: "1:263783747941:web:bc2e815a49e17b8b2b918c",
  measurementId: "G-Q5LGNYZLJP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const authentification=getAuth(app)
export const storage=getStorage(app)
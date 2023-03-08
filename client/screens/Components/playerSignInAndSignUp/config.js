import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth";
import * as firebase from 'firebase/app-check'
const firebaseConfig = {
  apiKey: "AIzaSyDAx7a32E9I8zpH4ceB1RXaI-5t2zv-G-Q",
  authDomain: "terrent-fe1f5.firebaseapp.com",
  projectId: "terrent-fe1f5",
  storageBucket: "terrent-fe1f5.appspot.com",
  messagingSenderId: "694630254699",
  appId: "1:694630254699:web:b1522299826b5aa833892e",
  measurementId: "G-BHGHJ8GHML"
};
// Initialize Firebase
let app;
if (!firebase.apps) {
  app = initializeApp(firebaseConfig);
} else {
  app = firebase.app(); // if already initialized, use that one
}

export const authentification = getAuth(app);
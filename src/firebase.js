// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//import * as firebase from "firebase/app";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCGibgVVaGeGbMryYPR1uzEY3OjZa0RgFA",
  authDomain: "instagram-clone-1bf5f.firebaseapp.com",
  databaseURL: "https://instagram-clone-1bf5f-default-rtdb.firebaseio.com",
  projectId: "instagram-clone-1bf5f",
  storageBucket: "instagram-clone-1bf5f.appspot.com",
  messagingSenderId: "207357928867",
  appId: "1:207357928867:web:3c20197299915e0d66e616",
  measurementId: "G-9GER9FM2TK",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

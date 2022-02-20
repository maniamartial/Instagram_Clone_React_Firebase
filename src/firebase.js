import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/storage";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDSv-pTeid8wMlt78X7hyz6wcd2dBXnmsw",
  authDomain: "instagram-clone2-aa015.firebaseapp.com",
  projectId: "instagram-clone2-aa015",
  storageBucket: "instagram-clone2-aa015.appspot.com",
  messagingSenderId: "467631486621",
  appId: "1:467631486621:web:66304aad9404b59aeb8674",
  measurementId: "G-H2TVF1T0MF",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = getStorage(firebaseApp);

export { auth, storage, db };

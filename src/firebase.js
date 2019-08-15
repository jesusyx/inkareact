import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCAUVtt4SezFjopQ0oy802HzNfTp3p2UD8",
    authDomain: "inkaperucapacitaciones-e3c07.firebaseapp.com",
    databaseURL: "https://inkaperucapacitaciones-e3c07.firebaseio.com",
    projectId: "inkaperucapacitaciones-e3c07",
    storageBucket: "inkaperucapacitaciones-e3c07.appspot.com",
    messagingSenderId: "983533015059",
    appId: "1:983533015059:web:e8e584e783f84d0b"
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage };
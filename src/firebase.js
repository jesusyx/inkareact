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
  
   firebase.firestore().settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
  });
  firebase.firestore().enablePersistence()
  .catch(function(err) {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          console.log("Multiple tabs open, persistence can only be enabled in one tab at a time")
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
          console.log("The current browser does not support all of the features required to enable persistence")
      }
  });
  const db = firebase.firestore();

  

  const auth = firebase.auth();

  const storage = firebase.storage();
  const currentTime = firebase.firestore
  


  export { db, auth, storage, currentTime };
import firebase from 'firebase';
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyDFEsFiHcXWDQIBSMsQLQ_bUkKSTGmvZ6g",
    authDomain: "booksanta-188fd.firebaseapp.com",
    projectId: "booksanta-188fd",
    storageBucket: "booksanta-188fd.appspot.com",
    messagingSenderId: "219904388781",
    appId: "1:219904388781:web:7923ebeca1b2319a7aa024"
  };
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();
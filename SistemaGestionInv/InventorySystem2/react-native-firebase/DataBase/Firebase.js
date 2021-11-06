import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBPRvNNLs8QnbhoUyma9HbgdvwTXRLVLhM",
    authDomain: "sistema-de-inventario-e637a.firebaseapp.com",
    projectId: "sistema-de-inventario-e637a",
    storageBucket: "sistema-de-inventario-e637a.appspot.com",
    messagingSenderId: "11355349242",
    appId: "1:11355349242:web:ebf624aec1f31596322943",
    measurementId: "G-KK6N1J2JZX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db=firebase.firestore()
const auth=firebase.auth();
const FieldValue=firebase.firestore.FieldValue;

export default {
    firebase,
    db,
    auth,
    FieldValue,
}
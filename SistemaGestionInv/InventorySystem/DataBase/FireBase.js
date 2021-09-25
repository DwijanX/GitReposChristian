
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBPRvNNLs8QnbhoUyma9HbgdvwTXRLVLhM",
  authDomain: "sistema-de-inventario-e637a.firebaseapp.com",
  projectId: "sistema-de-inventario-e637a",
  storageBucket: "sistema-de-inventario-e637a.appspot.com",
  messagingSenderId: "11355349242",
  appId: "1:11355349242:web:ebf624aec1f31596322943",
  measurementId: "G-KK6N1J2JZX"
};
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const auth=getAuth(app);
  export default
  {
    app,
    db,
    auth
  }
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection} from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDfKMqUrn_8FdwDS6RJ875i2goUxmNMrrs",
  authDomain: "ecommerce-7929f.firebaseapp.com",
  projectId: "ecommerce-7929f",
  storageBucket: "ecommerce-7929f.appspot.com",
  messagingSenderId: "820872052955",
  appId: "1:820872052955:web:e8718349682c1b7f26ccfe",
  measurementId: "G-8B9GZD7KVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);



export { app, db, storage, addDoc, collection};



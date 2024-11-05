import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDJHG5twiAxHK5_MSXqEauae1jAtzVNtHA",
  authDomain: "react-document-app-fairebase.firebaseapp.com",
  projectId: "react-document-app-fairebase",
  storageBucket: "react-document-app-fairebase.firebasestorage.app",
  messagingSenderId: "362803686273",
  appId: "1:362803686273:web:af82861f22f64b35515680",
  measurementId: "G-5RJ2QYZCVW"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

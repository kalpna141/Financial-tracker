// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdamxAt71oR8McBRLeQI7DMDiIPaA2UjE",
  authDomain: "financely-746b9.firebaseapp.com",
  projectId: "financely-746b9",
  storageBucket: "financely-746b9.appspot.com",
  messagingSenderId: "41630893060",
  appId: "1:41630893060:web:b7b2379a6a363adc596151",
  measurementId: "G-1P84T2X7WM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db= getFirestore(app);
const auth= getAuth(app);
const provider= new GoogleAuthProvider();
export {db,auth,provider,doc,setDoc};
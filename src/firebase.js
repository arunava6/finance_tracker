// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-zfg3LQkP9dWXdHOr_9sfFuhPvPQxa2U",
  authDomain: "finance-tracker-c11c1.firebaseapp.com",
  projectId: "finance-tracker-c11c1",
  storageBucket: "finance-tracker-c11c1.firebasestorage.app",
  messagingSenderId: "48673275723",
  appId: "1:48673275723:web:c45f6eeea80ca64c04f2ce",
  measurementId: "G-3W7KCBHEH8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
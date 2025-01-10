// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxVRB0mT3Tr2kdch3XTfJhkaDHdvwxOHU",
  authDomain: "androidz-6c526.firebaseapp.com",
  projectId: "androidz-6c526",
  storageBucket: "androidz-6c526.firebasestorage.app",
  messagingSenderId: "679201270010",
  appId: "1:679201270010:web:969f9eee571ca4c9d30143",
  measurementId: "G-2TVZPG0MBF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore and Auth instances
const db = getFirestore(app);
const auth = getAuth(app);
auth.useDeviceLanguage();
const provider = new GoogleAuthProvider();

export { db, auth, app, provider};

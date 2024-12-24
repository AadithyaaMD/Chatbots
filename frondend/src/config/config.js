// Import Firebase modules individually using the new v9+ syntax
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMtlm8STeiDMYPA4z-goFEOf81wzxVinY",
  authDomain: "project1-e7e0f.firebaseapp.com",
  projectId: "project1-e7e0f",
  storageBucket: "project1-e7e0f.firebasestorage.app",
  messagingSenderId: "718261255146",
  appId: "1:718261255146:web:7c01705acb5c9021a79093"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export services
export { auth, db, storage };

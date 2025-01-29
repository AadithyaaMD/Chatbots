import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase configuration for Project 1
const firebaseConfig = {
  apiKey: "AIzaSyCMtlm8STeiDMYPA4z-goFEOf81wzxVinY",
  authDomain: "project1-e7e0f.firebaseapp.com",
  projectId: "project1-e7e0f",
  storageBucket: "project1-e7e0f.appspot.com", // Correct storage bucket domain
  messagingSenderId: "718261255146",
  appId: "1:718261255146:web:7c01705acb5c9021a79093",
};

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Export Firebase services for use in other parts of your app
export { app, db, auth, storage };

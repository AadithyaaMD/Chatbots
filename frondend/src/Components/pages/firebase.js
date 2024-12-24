// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCoy2whGqoN62Onr8XvQEdjrayshPk4QiM",
    authDomain: "project3-3cf50.firebaseapp.com",
    projectId: "project3-3cf50",
    storageBucket: "project3-3cf50.firebasestorage.app",
    messagingSenderId: "569790085485",
    appId: "1:569790085485:web:897d5b3266ae16236f0264"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };

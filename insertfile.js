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

// Function to fetch JSON data and upload to Firestore
const uploadData = async () => {
    try {
      // Fetch the JSON data from insertfile.json
      const response = await fetch('insertfile.json');
      const laptops = await response.json();
  
      const laptopsCollection = collection(db, "dell"); // 'laptops' is the name of the collection
  
      for (const laptop of laptops) {
        // Add each laptop to the 'laptops' collection
        await addDoc(laptopsCollection, laptop);
        console.log(`Uploaded: ${laptop.model_name}`);
      }
  
      console.log("All laptops uploaded successfully!");
    } catch (error) {
      console.error("Error uploading laptops: ", error);
    }
  };
  
  // Add the button to your HTML
  const button = document.createElement('button');
  button.innerText = 'Upload Laptops Data';
  button.onclick = uploadData;
  document.body.appendChild(button);
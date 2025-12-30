// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB83m6ckxxD2et0eyNHuqyhIUZqp-Khaf8",
    authDomain: "hoho-8c439.firebaseapp.com",
    projectId: "hoho-8c439",
    storageBucket: "hoho-8c439.firebasestorage.app",
    messagingSenderId: "730227343936",
    appId: "1:730227343936:web:a529003099ac2bcf0655a5",
    measurementId: "G-YBB83W6X2N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
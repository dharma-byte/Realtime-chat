// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIZV5ohR3HL39bnIK41I5iVHtRuHTdV3A",
  authDomain: "realtime-chat-412cf.firebaseapp.com", // inferred from project ID
  projectId: "realtime-chat-412cf",
  storageBucket: "realtime-chat-412cf.firebasestorage.app",
  messagingSenderId: "233219300091",
  appId: "1:233219300091:ios:2ebeaf2b9e04c0d6afee5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

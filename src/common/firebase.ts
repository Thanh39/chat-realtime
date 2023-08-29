// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQQF4oy563aav-qtfqsbPkwSm3r2PYVIg",
  authDomain: "chat-realtime-5244a.firebaseapp.com",
  projectId: "chat-realtime-5244a",
  storageBucket: "chat-realtime-5244a.appspot.com",
  messagingSenderId: "626032257755",
  appId: "1:626032257755:web:49d759d790b0b437eabafe",
  measurementId: "G-94MY3TR8B8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage();
// const analytics = getAnalytics(app);
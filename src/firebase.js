import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtvIXLGHK1s_hHudltXhFgHN2PSwbgvtA",
  authDomain: "chat-da355.firebaseapp.com",
  projectId: "chat-da355",
  storageBucket: "chat-da355.appspot.com",
  messagingSenderId: "335685579154",
  appId: "1:335685579154:web:36521f148d5fbff486914b",
  measurementId: "G-1HB04QXHK0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const analytics = getAnalytics(app);
export const storage = getStorage();
export const db = getFirestore();
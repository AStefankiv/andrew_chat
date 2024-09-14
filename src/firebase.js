import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD04LkAklQncnVTT41BCS0zK3d6crTTjbM",
  authDomain: "chat-a9502.firebaseapp.com",
  projectId: "chat-a9502",
  storageBucket: "chat-a9502.appspot.com",
  messagingSenderId: "795214069875",
  appId: "1:795214069875:web:e3eb3fadf4c6e571b7aa06"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDzHdE9rkSMxEa-0SZvgQaYVKmLDL5e83w",
  authDomain: "musique-e0769.firebaseapp.com",
  projectId: "musique-e0769",
  storageBucket: "musique-e0769.appspot.com",
  messagingSenderId: "164758159918",
  appId: "1:164758159918:web:7d2f859a045a55251595bf",
  measurementId: "G-6FF2NKZYS7",
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore();
export const auth = getAuth(app);
export const storage = getStorage();

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCKyCpF8uIjq97LDokIPhe7NN-DOyNlwiE",
  authDomain: "fir-f8569.firebaseapp.com",
  projectId: "fir-f8569",
  storageBucket: "fir-f8569.firebasestorage.app",
  messagingSenderId: "986120725621",
  appId: "1:986120725621:web:27a9b5c6c2e4b4499b843c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
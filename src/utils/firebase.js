
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAx2sn3DIx1kZjpkg5qZGUW7Gsjz6LNGSw",
  authDomain: "netflix-gpt-233e3.firebaseapp.com",
  projectId: "netflix-gpt-233e3",
  storageBucket: "netflix-gpt-233e3.firebasestorage.app",
  messagingSenderId: "12277286602",
  appId: "1:12277286602:web:8ad399044987520fcf5633",
  measurementId: "G-BR080BX6WF"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
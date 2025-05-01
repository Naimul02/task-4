// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByZgjlryHArvRSt74VZ44V2Kkt6VOa4Zg",
  authDomain: "task-4-739ca.firebaseapp.com",
  projectId: "task-4-739ca",
  storageBucket: "task-4-739ca.firebasestorage.app",
  messagingSenderId: "194271484507",
  appId: "1:194271484507:web:c68339f941e9fed511fd7e",
  measurementId: "G-YV6CFM4YMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage();
export const db = getFirestore()
export default app;
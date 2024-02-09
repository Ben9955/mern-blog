// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-dd539.firebaseapp.com",
  projectId: "mern-blog-dd539",
  storageBucket: "mern-blog-dd539.appspot.com",
  messagingSenderId: "666497513843",
  appId: "1:666497513843:web:aade64f339aaafef13ad06",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

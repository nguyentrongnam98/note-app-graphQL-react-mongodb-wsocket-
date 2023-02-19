// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgumO9zqsmECgn6UThQ6ZBTbqwtXkkfFs",
  authDomain: "note-app-65750.firebaseapp.com",
  projectId: "note-app-65750",
  storageBucket: "note-app-65750.appspot.com",
  messagingSenderId: "410831415684",
  appId: "1:410831415684:web:23e224321b1dd9d2d815d1",
  measurementId: "G-4PNC7D6LW3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
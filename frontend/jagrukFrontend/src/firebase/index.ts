// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHh8IaEIAhMyeCMYRXBs0bWTIDcS2i8KQ",
  authDomain: "jagruk-81928.firebaseapp.com",
  projectId: "jagruk-81928",
  storageBucket: "jagruk-81928.firebasestorage.app",
  messagingSenderId: "712582982202",
  appId: "1:712582982202:web:6e3abfe455308667ad6303",
  measurementId: "G-GC37NFWS7K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app, auth}



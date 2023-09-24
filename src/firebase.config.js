// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2V7n-v5C990UfrldD_97i6sJETdax2CQ",
  authDomain: "otpgenerationmain.firebaseapp.com",
  projectId: "otpgenerationmain",
  storageBucket: "otpgenerationmain.appspot.com",
  messagingSenderId: "1095482617720",
  appId: "1:1095482617720:web:e8b4f08063946c453da28d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

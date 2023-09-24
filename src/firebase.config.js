// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0ob5KAwJ1OnKTnyYUOLr5DtH12dGQLbk",
  authDomain: "otpgen-1d6cb.firebaseapp.com",
  projectId: "otpgen-1d6cb",
  storageBucket: "otpgen-1d6cb.appspot.com",
  messagingSenderId: "1093839676175",
  appId: "1:1093839676175:web:ea3fa257d20c5ab2a2147a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

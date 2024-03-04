// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// "firebase": "^9.22.2",

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDF1T2GvnAkfhF08AKMo2WOtokMFw0QQRk",
    authDomain: "hotelians-d4f1a.firebaseapp.com",
    projectId: "hotelians-d4f1a",
    storageBucket: "hotelians-d4f1a.appspot.com",
    messagingSenderId: "704748444696",
    appId: "1:704748444696:web:45c6d7d8abd9f63b6b376d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export db auth = getFirestore(app);
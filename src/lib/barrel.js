import { toggleSignIn, handleSignUp } from "../lib/emailAuth";

// import { default as firestore } from "firebase/firestore";
import * as firebase from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
// import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js'
// Add Firebase products to use
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js'
// import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js' 

const firebaseConfig = {
  apiKey: "AIzaSyAMoIZnaqiWN7MrGggAkrPwJqTMUN-_xXE",
  authDomain: "outsy-mxg.firebaseapp.com",
  databaseURL: "https://outsy-mxg-default-rtdb.firebaseio.com",
  projectId: "outsy-mxg",
  storageBucket: "outsy-mxg.appspot.com",
  messagingSenderId: "1058170420655",
  appId: "1:1058170420655:web:06d17c4cc4440b35d0035a",
  measurementId: "G-MF6SX17B18"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const authApp = getAuth(app);

export { toggleSignIn, handleSignUp};

export  default authApp;

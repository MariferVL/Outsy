import { toggleSignIn, initApp } from "./emailAuth.js"
import { default as firebase } from "firebase/app";

import { default as firestore } from "firebase/firestore";

/* import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js'
// Add Firebase products to use
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js' */


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
const app = firebase.initializeApp(firebaseConfig)
// Initialize Firebase Authentication and get a reference to the service
export { toggleSignIn, initApp }

export  default {app, funct};
export { default as firebase } from "firebase/app";
export { default as firestore } from "firebase/firestore";


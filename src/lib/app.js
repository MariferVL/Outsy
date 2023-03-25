import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js'
// Add Firebase products to use
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js'

const firebaseConfig = {
    apiKey: 'AIzaSyAMoIZnaqiWN7MrGggAkrPwJqTMUN-_xXE',
    authDomain: 'outsy-mxg.firebaseapp.com',
    projectId: 'outsy-mxg',
    storageBucket: 'outsy-mxg.appspot.com',
    messagingSenderId: '1058170420655',
    appId: '1:1058170420655:web:06d17c4cc4440b35d0035a',
    measurementId: 'G-MF6SX17B18',
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Firebase Authentication and get a reference to the service
  const analytics = getAnalytics(app);
  export const auth = getAuth(app);
  
  export  default {app, funct};
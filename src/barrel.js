import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

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
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

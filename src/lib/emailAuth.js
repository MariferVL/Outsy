// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
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

// Handles the sign in button press.
function toggleSignIn() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (email.length < 4) {
      alert("Por favor, ingresa un correo electrónico.");
      return;
    }
    if (password.length < 4) {
      alert("Por favor, ingresa una contraseña.");
      return;
    }
    // Sign in with email and pass.
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          alert("Contraseña Errónea.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
        document.getElementById("sign-in").disabled = false;
      });
  }
  document.getElementById("sign-in").disabled = true;
}

//Handles the sign up button press.
function handleSignUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (email.length < 4) {
    alert("Por favor, ingresa un correo electrónico.");
    return;
  }
  if (password.length < 4) {
    alert("Por favor, ingresa una contraseña.");
    return;
  }
  // Create user with email and pass.
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == "auth/weak-password") {
        alert("Esta contraseña es muy insegura");
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
}

//Sends an email verification to the user.
function sendEmailVerification() {
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(function () {
      // Email Verification sent!
      alert("Verificación de correo electrónico Enviada.");
    });
}

function sendPasswordReset() {
  const email = document.getElementById("email").value;
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(function () {
      // Password Reset Email Sent!
      alert("Renovación de Contraseña enviada a Correo Electrónico");
    })
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == "auth/invalid-email") {
        alert(errorMessage);
      } else if (errorCode == "auth/user-not-found") {
        alert(errorMessage);
      }
      console.log(error);
    });
}

/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
  // Listening for auth state changes.
  firebase.auth().onAuthStateChanged(function (user) {
    document.getElementById("verify-email").disabled = true;
    if (user) {
      // User is signed in.
      const displayName = user.displayName;
      const email = user.email;
      const emailVerified = user.emailVerified;
      const photoURL = user.photoURL;
      const isAnonymous = user.isAnonymous;
      const uid = user.uid;
      const providerData = user.providerData;
      document.getElementById("sign-in-status").textContent =
        "Ingresado";
      document.getElementById("sign-in").textContent = "Cerrar Sesión";
      document.getElementById("account-details").textContent =
        JSON.stringify(user, null, "  ");
      if (!emailVerified) {
        document.getElementById("verify-email").disabled = false;
      }
    } else {
      // User is signed out.
      document.getElementById("sign-in-status").textContent =
        "Cerró sesión";
      document.getElementById("sign-in").textContent = "Ingresar";
      document.getElementById("account-details").textContent =
        "null";
    }
    document.getElementById("sign-in").disabled = false;
  });

  document
    .getElementById("sign-in")
    .addEventListener("click", toggleSignIn, false);
  document
    .getElementById("sign-up")
    .addEventListener("click", handleSignUp, false);
  document
    .getElementById("verify-email")
    .addEventListener("click", sendEmailVerification, false);
  document
    .getElementById("password-reset")
    .addEventListener("click", sendPasswordReset, false);
}

window.onload = function () {
  initApp();
};

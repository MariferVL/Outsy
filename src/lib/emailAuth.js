//   Firebase CDN import
import app from './firebase';
// import {getAuth, currentUser, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, onAuthStateChanged  } from 'firebase/auth';
import * as auth  from 'https://www.gstatic.com/firebasejs/9.19.0/firebase-auth.js'


const authApp = auth.getAuth(app);


/**
 * Handles the sign in button press.
 */
function toggleSignIn(email, password) {

  if (auth.currentUser) {
    signOut(authApp);
  } else {
    // Sign in with email and pass.
    auth.signInWithEmailAndPassword(authApp, email, password).then(function (userCredential) {
      // Return user info
      return userCredential.user;
    }).catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      //FIXME: comentado por test
      // const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        //FIXME: cambiar por modal
        // alert('Contraseña Errónea.');
        //TODO: agregar mensaje al return
        return 
      } else {
        // alert(errorMessage);
      }
    });
  }

  document
    .getElementById('password-reset')
    .addEventListener('click', () => auth.sendPasswordReset(authApp, email));

}


/**
 * Handles the sign up button press.
 */
function handleSignUp(email, password) {
  let verification = false;
  // Create user with email and pass.
  return new Promise ( (resolve, reject) => {
    auth.createUserWithEmailAndPassword(authApp, email, password)
    .then((cred) => {
      verification = sendVerification(cred.user);
      resolve (verification)
    })
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      //FIXME: comentado por test
      // const errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
                //FIXME: cambiar por modal
        // alert('Esta contraseña es muy insegura');
      } else {
         //FIXME: cambiar por modal
        // alert(errorMessage);
      }
      reject (error);
    });
  });
}

/**
 * Send an email verification to the user.
 */
function sendVerification(user) {
  auth.sendEmailVerification(user).then(function () {
    // Email Verification sent!
    // alert('Email Verification Sent!');
    return user.emailVerified;
  })
    .catch((error) => {
      //FIXME: agregar modal
    });
}

/**
 *
 * @param {*} authApp
 * @param {*} email
 */
function sendPasswordReset(email) {

  auth.sendPasswordResetEmail(authApp, email)
    .then(function () {
      //FIXME: cambiar por modal
      // Password Reset Email Sent!
      // alert('Password Reset Email Sent!');
    })
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == 'auth/invalid-email') {
        //FIXME: cambiar por modal
        // alert(errorMessage);
      } else if (errorCode == 'auth/user-not-found') {
        //FIXME: cambiar por modal
        // alert(errorMessage);
      }
      // console.log(error);
    });
}

function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth.signInWithPopup(authApp, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = auth.GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      //FIXME: comentado por test
      // const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = auth.GoogleAuthProvider.credentialFromError(error);
      // ...
    });

  // auth.signInWithPopup(authApp);
  // const provider = new GoogleAuthProvider();
  // return signInWithPopup(authApp, provider);
}

/**
 * initApp handles:
 *  - onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
  // Listening for auth state changes.
  auth.onAuthStateChanged(authApp, function (user) {
    if (user) {
      // User is signed in.
      const displayName = user.displayName;
      const email = user.email;
      const emailVerified = user.emailVerified;
      const photoURL = user.photoURL;
      const isAnonymous = user.isAnonymous;
      const uid = user.uid;
      const providerData = user.providerData;
    }
  });
}

export { toggleSignIn, handleSignUp, signInWithGoogle };

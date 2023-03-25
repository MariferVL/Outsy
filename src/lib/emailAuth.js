import { authApp } from "./barrel.js";
import * as firebase from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import * as auth from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

function showPassword() {
  const showPasswordCheckbox = document.getElementById("showPassword");
  const password = document.getElementById("password");

  showPasswordCheckbox.addEventListener("change", () => {
    if (showPasswordCheckbox.checked) {
      password.type = "text";
    } else {
      password.type = "password";
    }
  });
}

/**
 * Handles the sign in button press.
 */

function toggleSignIn() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut(authApp);
  } else {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const email = emailInput.value;
    const password = passwordInput.value;
    if (email.length < 4) {
      emailInput.setCustomValidity("Por favor, ingresa un correo electrónico.");
      return;
    }
    if (password.length < 4) {
      passwordInput.setCustomValidity("Por favor, ingresa una contraseña.");
      return;
    }
    // Sign in with email and pass.
    firebase
      .auth()
      .signInWithEmailAndPassword(authApp, email, password)
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          passwordInput.setCustomValidity("Contraseña Errónea.");
        } else {
          passwordInput.setCustomValidity(errorMessage);
        }
        console.log(error);
      });
  }
  document
    .getElementById("password-reset")
    .addEventListener("click", sendPasswordReset, false);
}

/**
 * Handles the sign up button press.
 */
function handleSignUp() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const email = emailInput.value;
  const password = passwordInput.value;
  if (email.length < 4) {
    emailInput.setCustomValidity("Por favor, ingresa un correo electrónico.");
    return;
  }
  if (password.length < 4) {
    passwordInput.setCustomValidity("Por favor, ingresa una contraseña.");
    return;
  }
  // Create user with email and pass.
  firebase
    .auth()
    .createUserWithEmailAndPassword(authApp, email, password)
    .then((cred) => {
      console.log("Usuario registrado con éxito", cred.user);

      // Envío del correo electrónico de verificación después de que el usuario haya iniciado sesión
      firebase
        .auth()
        .onAuthStateChanged((user) => {
          if (user) {
            user
              .sendEmailVerification()
              .then(() => {
                console.log("Correo electrónico de verificación enviado.");
                // Realizar cualquier acción necesaria después del envío del correo electrónico
              })
              .catch((error) => {
                console.error(
                  "Error al enviar correo electrónico de verificación",
                  error
                );
                // Realizar cualquier acción necesaria en caso de error al enviar el correo electrónico
              });
          }
        });
    })
    .catch((error) => {
      console.error("Error al registrar usuario", error);
      // Realizar cualquier acción necesaria en caso de error al registrar usuario
    })
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
  // sendVerification();
  return;
}

// /**
//  * Sends an email verification to the user.
//  */
// function sendVerification() {
//   firebase.auth().currentUser.sendEmailVerification().then(function () {
//     // Email Verification sent!
//     alert("Email Verification Sent!");
//   });
// }

function sendPasswordReset() {
  const emailInput = document.getElementById("email");
  const email = emailInput.value;
  firebase.auth().sendPasswordResetEmail(authApp, email)
    .then(function () {
      // Password Reset Email Sent!
      alert("Password Reset Email Sent!");
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
 *  - onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
  showPassword();
  // Listening for auth state changes.
  firebase.auth().onAuthStateChanged(authApp, function (user) {
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
  const signIn = document.getElementById("sign-in");
  const signOut = document.getElementById("sign-up");

  if (signIn) {
    signIn.addEventListener("click", toggleSignIn, false);
  } else if (signOut) {
    signOut.addEventListener("click", handleSignUp, false);
  }
}

export { toggleSignIn, initApp };

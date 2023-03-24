


/* createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  }); */

// Global input email and password
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

// Handles the sign in button press.
function toggleSignIn() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    // FIXME: Aquí quitamos las variables email y password 
    if (email.length < 4) {
      email.setCustomValidity('Por favor, ingresa un correo electrónico.');
      return;
    }
    if (password.length < 4) {
      password.setCustomValidity('Por favor, ingresa una contraseña.');
      return;
    }
    // Sign in with email and pass.
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          password.setCustomValidity('Contraseña Errónea.');
        } else {
          password.setCustomValidity(errorMessage);
        }
        console.log(error);
        document.getElementById('sign-in').disabled = false;
      });
  }
  document.getElementById('sign-in').disabled = true;
}

// Handles the sign up button press.
function handleSignUp() {
  // FIXME: Aquí quitamos las variables email y password 
  if (email.length < 4) {
    email.setCustomValidity('Por favor, ingresa un correo electrónico.');
    return;
  }
  if (password.length < 4) {
    password.setCustomValidity('Por favor, ingresa una contraseña.');
    return;
  }
  // Create user with email and pass.
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        password.setCustomValidity('Esta contraseña es muy insegura');
      } else {
        password.setCustomValidity(errorMessage);
      }
      console.log(error);
    });
}

// Sends an email verification to the user.
function sendEmailVerification() {
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(() => {
      // Email Verification sent!
      // TODO: Hacer un innerHTML o una imagen hecha para sustituir el alert
      alert('Verificación de correo electrónico Enviada.');
    });
}

function sendPasswordReset() {
  // FIXME: Aquí quitamos la variable email
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      // Password Reset Email Sent!
      // TODO: Hacer un innerHTML o una imagen hecha para sustituir el alert
      alert('Renovación de Contraseña enviada a Correo Electrónico');
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/invalid-email') {
        alert(errorMessage);
      } else if (errorCode === 'auth/user-not-found') {
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
  firebase.auth().onAuthStateChanged((user) => {
    document.getElementById('verify-email').disabled = true;
    if (user) {
      // User is signed in.
      const displayName = user.displayName;
      const email = user.email;
      const emailVerified = user.emailVerified;
      const photoURL = user.photoURL;
      const isAnonymous = user.isAnonymous;
      const uid = user.uid;
      const providerData = user.providerData;
      // TODO: Cambiar nombres en HTML de ID para navbar en feed
      document.getElementById('sign-in-status').textContent =
        'Ingresado';
      document.getElementById('sign-in').textContent = 'Cerrar Sesión';
      document.getElementById('account-details').textContent =
        JSON.stringify(user, null, '  ');
      if (!emailVerified) {
        document.getElementById('verify-email').disabled = false;
      }
    } else {
      // User is signed out.
      document.getElementById('sign-in-status').textContent =
        'Cerró sesión';
      document.getElementById('sign-in').textContent = 'Ingresar';
      document.getElementById('account-details').textContent =
        'null';
    }
    document.getElementById('sign-in').disabled = false;
  });

      // TODO: Cambiar nombres en HTML de ID para navbar en feed
  document
    .getElementById('sign-in')
    .addEventListener('click', toggleSignIn, false);
  document
    .getElementById('sign-up')
    .addEventListener('click', handleSignUp, false);
  document
    .getElementById('verify-email')
    .addEventListener('click', sendEmailVerification, false);
  document
    .getElementById('password-reset')
    .addEventListener('click', sendPasswordReset, false);
}



export { toggleSignIn, handleSignUp, sendEmailVerification, sendPasswordReset, initApp }

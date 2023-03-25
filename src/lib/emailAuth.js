import { auth } from "./barrel.js";
// Global input email and password


// Handles the sign in button press.
function toggleSignIn() {
  if (auth.currentUser) {
    auth.signOut();
  } else {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (email.length < 4) {
      email.setCustomValidity('Por favor, ingresa un correo electrónico.');
      return;
    }
    if (password.length < 4) {
      password.setCustomValidity('Por favor, ingresa una contraseña.');
      return;
    }
    // Sign in with email and pass.
    auth.signInWithEmailAndPassword(email, password)
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
      });
  }
  document.getElementById('password-reset').addEventListener('click', sendPasswordReset, false);
};

function showPassword() {
  const showPasswordCheckbox = document.getElementById('showPassword');
  const password = document.getElementById('password');

  showPasswordCheckbox.addEventListener('change', () => {
    if (showPasswordCheckbox.checked) {
      password.type = 'text';
    } else {
      password.type = 'password';
    }
  })
};

// Handles the sign up button press.
function handleSignUp() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  if (email.length < 4) {
    email.setCustomValidity('Por favor, ingresa un correo electrónico.');
    return;
  }
  if (password.length < 4) {
    password.setCustomValidity('Por favor, ingresa una contraseña.');
    return;
  } else {
    sendEmailVerification()
  }
  // Create user with email and pass.
  auth.createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Usuario registrado correctamente
  })
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
  auth.currentUser.sendEmailVerification()
    .then(() => {
      // Email Verification sent!
      // TODO: Hacer un innerHTML o una imagen hecha para sustituir el alert
      alert('Verificación de correo electrónico Enviada.');
    });
}

function sendPasswordReset() {
  const email = document.getElementById('email').value;
  auth.sendPasswordResetEmail(email)
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
 *  - auth.onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
  showPassword();
  // Listening for auth state changes.
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      // TODO: Revisar los datos que almacena la data
      const displayName = user.displayName;
      const email = user.email;
      const emailVerified = user.emailVerified;
      const photoURL = user.photoURL;
      const isAnonymous = user.isAnonymous;
      const uid = user.uid;
      const providerData = user.providerData;
    }
  });


  // TODO: Cambiar nombres en HTML de ID para navbar en feed
  const signIn =  document.getElementById('sign-in');
  const signOut = document.getElementById('sign-up');

  if (signIn) {
    signIn.addEventListener('click', toggleSignIn, false);
  } else if (signOut) {
    signOut.addEventListener('click', handleSignUp, false);
  }
 
  // FIXME: Mover el listener al feed para cerrar sesión
 /*    document
    .getElementById('signOut')
    .addEventListener('click', toggleSignIn, false); */
}



export { toggleSignIn, initApp }

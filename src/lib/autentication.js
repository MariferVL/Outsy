import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

function validateData() {
  let valid = true;
  if (email.length < 8) {
    return email.setCustomValidity('Por favor, ingresa un correo electrónico válido.');
  } if (email.length >= 8) {
    return true;
  } if (password.length < 8) {
    return password.setCustomValidity('Tu contraseña debe contener al menos 8 caracteres');
  } if (password.length >= 8) {
    return true;
  }
}

document.getElementById('validSub').addEventListener('click', validateData());

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

// Importar Firebase
import firebase from 'firebase/app';
import 'firebase/auth';

// Configuración de Firebase
const firebaseConfig = {
  // Coloca aquí la configuración de tu proyecto de Firebase
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Esperar a que se cargue el DOM
document.addEventListener('DOMContentLoaded', function() {
  // Esperar a que se cree la vista de inicio de sesión
  const loginView = document.getElementById('login-view');
  if (loginView) {
    // Agregar un evento submit al formulario de inicio de sesión
    const loginForm = loginView.querySelector('#login-form');
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Obtener el correo electrónico y la contraseña del formulario
      const email = loginForm.email.value;
      const password = loginForm.password.value;

      // Autenticar al usuario con Firebase
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function() {
          // Redirigir al usuario a la página principal
          window.location.href = '/';
        })
        .catch(function(error) {
          // Mostrar un mensaje de error si la autenticación falla
          const errorMessage = error.message;
          loginForm.querySelector('.error-message').textContent = errorMessage;
        });
    });
  }

  // Esperar a que se cree la vista de registro
  const registerView = document.getElementById('register-view');
  if (registerView) {
    // Agregar un evento submit al formulario de registro
    const registerForm = registerView.querySelector('#register-form');
    registerForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Obtener el correo electrónico y la contraseña del formulario
      const email = registerForm.email.value;
      const password = registerForm.password.value;

      // Crear una cuenta de usuario con Firebase
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function() {
          // Redirigir al usuario a la página principal
          window.location.href = '/';
        })
        .catch(function(error) {
          // Mostrar un mensaje de error si la creación de cuenta falla
          const errorMessage = error.message;
          registerForm.querySelector('.error-message').textContent = errorMessage;
        });
    });
  }
});



// POSIBLES ERRORES DE AUTENTICACIÓN 

<script src="https://www.gstatic.com/firebasejs/8.3.3/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.3.3/firebase-auth.js"></script>


firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Usuario registrado correctamente
  })
  .catch((error) => {
    // Error al registrar usuario
  });


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // Usuario autenticado correctamente
  } else {
    // Usuario no autenticado
  }
});



const user = firebase.auth().currentUser;
if (user) {
  // Acceder a las propiedades o métodos del objeto
} else {
  // Usuario no autenticado
}


firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Usuario registrado correctamente
    const user = userCredential.user;
    console.log(`Usuario registrado con éxito: ${user.email}`);
    // Puedes realizar otras acciones aquí, como enviar un correo electrónico de confirmación o redirigir al usuario a otra página
  })
  .catch((error) => {
    // Error al registrar usuario
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(`Error al registrar usuario: ${errorMessage} (${errorCode})`);
  });
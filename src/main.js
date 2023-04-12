import { handleSignUp, toggleSignIn, signInWithGoogle } from './lib/emailAuth.js';
import { listenPostForm } from './js/postDOM.js';
import Router from './router/router.js';



const router = new Router();
router.start();



/**
 * Move navbar as the web page is scrolled
 */
function scrollFunction() {
  const navbar = document.getElementById('navbar');
  const logo = document.getElementById('logo');
  if (navbar && logo) {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      navbar.style.padding = '30px 10px';
      logo.style.fontSize = '25px';
    } else {
      navbar.style.padding = '80px 10px';
      logo.style.fontSize = '35px';
    }
  }
  return;
}


// Scroll just show with home and about view
document.addEventListener('DOMContentLoaded', function () {
  const homeView = document.getElementById('main');
  const aboutView = document.getElementById('about');

  if (homeView || aboutView) {
    scrollFunction();
  }
});


/**
 * Display the first view of the website
 * IIFE
 */
(function() {
  
  router.navigateTo('/home');

  const signInHandler = () => {
    router.navigateTo('/signin');
    listenForm('formSignIn', 'sign-in');

  };
  const signUpHandler = () => {
    router.navigateTo('/signup');
    listenForm('formSignUp', 'sign-up');

  };

  const aboutHandler = () => {
    router.navigateTo('/about');
  };

  document.getElementById('signIn').addEventListener('click', signInHandler);
  document.getElementById('signUp').addEventListener('click', signUpHandler);
  // document.getElementById('signUp2').addEventListener('click', signUpHandler);
  document.getElementById('about').addEventListener('click', aboutHandler);
})()


/**
 * Validate email input structure
 * @param {*} email
 * @returns boolean
 */
function validateEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}


/**
 * Validate password input structure
 * @param {*} password
 * @returns boolean
 */
function validatePassword(password) {
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  return regexPassword.test(password);
}


/**
 * Validate sign in and sign out inputs
 * @param {*} input
 * @returns
 */
function validateInput(input, type) {
  const Inputvalue = input.value;
  let valid = true;
  if (type === 'email') {
    if (validateEmail(Inputvalue)) {
      return;
    } else {
      input.setCustomValidity(
        'Por favor, ingresa un correo electrónico válido'
      );
      valid = false;
    }
  } else if (type === 'pass') {
    if (validatePassword(Inputvalue)) {
      return;
    } else {
      input.setCustomValidity('Por favor, ingresa una contraseña válida');
      valid = false;
    }
  }
  return valid;
}


/**
 * Allow user see their password
 * @returns boolean
 */
function showPassword() {
  const showPasswordCheckbox = document.getElementById('showPassword');
  const password = document.getElementById('password');

  showPasswordCheckbox.addEventListener('change', () => {
    if (showPasswordCheckbox.checked) {
      password.type = 'text';
    } else {
      password.type = 'password';
    }
  });
  // For tests
  return showPasswordCheckbox.checked;
}


/**
 * Change button attribute to disable
 * @param {*} idElement
 * @returns
 */
function enableButtons(idElement) {
  const elementButton = document.getElementById(idElement);
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  if (elementButton) {
    validateInput(emailInput, 'email');
    validateInput(passwordInput, 'pass');
  }
  return [emailInput.value, passwordInput.value];
}


const listenPost = () => document.getElementById('post').addEventListener('click', () => {
  router.navigateTo('/post/create');
 listenPostForm();

});


/**
 * Listen when user submit info clicking button 
 * @param {*} formID 
 * @param {*} buttonID 
 * @returns 
 */
async function listenForm(formID, buttonID) {
  showPassword();
  const data = new Promise((resolve, reject) => {
    document.getElementById(formID).addEventListener('submit', () => {
      const userData = enableButtons(buttonID);
      resolve(userData);
    }, { once: true });
  });

  //FIXME: Revisar que funcione la autenticación de google
  if (formID === 'formSignIn') {
    document.getElementById('googleAuth').addEventListener('click', (e) => {
      e.preventDefault();
      signInWithGoogle()
        .then(
          (useCredential) => {
            router.navigateTo('/feed');
            // getPosts();
            listenPost();
          },
          (error) => {
            // FIXME: Revisar el open modal
            openModal(error.message);
          });
    });

  }

  data.then((d) => {
    sendValidData(formID, d[0], d[1])
  })

  return formID, email, password;
}


/**
 * 
 * @param {*} formID 
 * @param {*} email 
 * @param {*} password 
 */
function sendValidData(formID, email, password) {
  if (formID === 'formSignUp') {
    const emailIgm = document.createElement('img');
    emailIgm.src = './images/emailVerification.png';
    emailIgm.className = 'emailImg';
    const main = document.getElementById('signUpView');
    main.replaceWith(emailIgm);
    handleSignUp(email, password)
  }
  else if (formID === 'formSignIn') {
    toggleSignIn(email, password)
    router.navigateTo('/feed');
    listenPost();

  }
}


export{scrollFunction}
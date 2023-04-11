import router from "./router/router.js";
import { toggleSignIn, handleSignUp, signInWithGoogle } from "./lib/emailAuth.js";
import { listenPostForm } from "./js/postDOM.js";
router.start();

/**
 * Move navbar as the web page is scrolled
 */
function scrollFunction() {
  const navbar = document.getElementById("navbar");
  const logo = document.getElementById("logo");
  if (navbar && logo) {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      navbar.style.padding = "30px 10px";
      logo.style.fontSize = "25px";
    } else {
      navbar.style.padding = "80px 10px";
      logo.style.fontSize = "35px";
    }
  }
}



// Scroll just show with home and about view
document.addEventListener("DOMContentLoaded", function () {
  const homeView = document.getElementById("main");
  const aboutView = document.getElementById("about");

  if (homeView || aboutView) {
    scrollFunction();
  }
});


/**
 * Display the first view of the website
 */
function activateRouter() {
  router.navigateTo("/home");

  const signInHandler = () => {
    router.navigateTo("/signin");
    listenForm("formSignIn", "sign-in");

  };
  const signUpHandler = () => {
    router.navigateTo("/signup");
    listenForm("formSignUp", "sign-up");

  };

  const aboutHandler = () => {
    router.navigateTo("/about");
  };

  document.getElementById("signIn").addEventListener("click", signInHandler);
  document.getElementById("signUp").addEventListener("click", signUpHandler);
  // document.getElementById("signUp2").addEventListener("click", signUpHandler);
  document.getElementById("about").addEventListener("click", aboutHandler);
}

/**
 * Validate email input structure
 * @param {*} email
 * @returns boolean
 */
function validateEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log("valdateEmail: " + regexEmail.test(email));
  return regexEmail.test(email);
}

/**
 * Validate password input structure
 * @param {*} password
 * @returns boolean
 */
function validatePassword(password) {
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  console.log("validatePassword: " + regexPassword.test(password));

  return regexPassword.test(password);
}

//FIXME: Tomar los customvalidity
// /**
//  * Validate sign in and sign out inputs
//  * @param {*} input
//  * @returns
//  */
// function validateInput(input, type) {
//   const Inputvalue = input.value;
//   let valid = true;
//   if (type === "email") {
//     console.log("emailValue: " + Inputvalue);
//     if (validateEmail(Inputvalue)) {
//       return;
//     } else {
//       input.setCustomValidity(
//         "Por favor, ingresa un correo electrónico válido"

//       );
//       valid = false;
//     }
//   } else if (type === "pass") {
//     console.log("PassValue: " + Inputvalue);
//     if (validatePassword(Inputvalue)) {
//       return;
//     } else {
//       input.setCustomValidity("Por favor, ingresa una contraseña válida");
//       valid = false;
//     }
//   }
//   return valid;
// }

/**
 * Allow user see their password
 * @returns boolean
 */
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
  // For tests
  return showPasswordCheckbox.checked;
}


/**
 * Change button attribute to disable
 * @param {*} idElement
 * @returns
 */
function enableButtons(formID, idElement) {
  const elementButton = document.getElementById(idElement);
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const form = document.getElementById(formID);
  console.log("button y id: " + elementButton + " " + idElement);
  console.log("email: " + emailInput);
  console.log("pass: " + passwordInput);

  elementButton.disabled = true;

  if (elementButton) {
    emailInput.addEventListener('input', () => {
      if (validateEmail(emailInput.value) && validatePassword(passwordInput.value)) {
        elementButton.disabled = false;
      } else {
        elementButton.disabled = true;
      }
    });

    passwordInput.addEventListener('input', () => {
      if (validateEmail(emailInput.value) && validatePassword(passwordInput.value)) {
        elementButton.disabled = false
      } else {
        elementButton.disabled = true;
      }
    });
  }

  console.log("Este debería ser email y p " + emailInput.value + passwordInput.value);
  return [emailInput.value, passwordInput.value];
}



const listenPost = () => document.getElementById("post").addEventListener("click", () => {
  router.navigateTo('/post/create');
  console.log("creó vista Post");
  listenPostForm();

});

/**
 * Listen when user submit info clicking button 
 * @param {*} formID 
 * @param {*} buttonID 
 * @returns 
 */
function listenForm(formID, buttonID) {
  // showPassword();
  console.log("form id :" + formID);
  const userData = enableButtons(formID, buttonID);
  console.log("Esto es userdata " + userData);
  if (formID === "formSignIn") {
    document.getElementById("googleAuth").addEventListener("click", (e) => {
      e.preventDefault();
      signInWithGoogle()
        .then(
          (useCredential) => {
            router.navigateTo("/feed");
            // getPosts();
            listenPost();
          },
          (error) => {
            // FIXME: Revisar el open modal
            openModal(error.message);
          });
    });
  }
  toAuth(formID, userData[0], userData[1])
  console.log("Esto es data " + userData);
  console.log("email lista: " + userData[0] + userData[1])

  return formID, email, password;
}


/**
 * 
 * @param {*} formID 
 * @param {*} email 
 * @param {*} password 
 */
function toAuth(formID, email, password) {
  console.log("Entro a toAuth " + formID + email + password);
  if (formID === "formSignUp") {
    document.getElementById("sign-up").addEventListener("click", () => {
      const emailIgm = document.createElement("img");
      emailIgm.src = "./images/emailVerification.png";
      emailIgm.className = "emailImg";
      const main = document.getElementById("signUpView");
      main.replaceWith(emailIgm);
      console.log("Entro al if de handle");
      handleSignUp(email, password);
    });
  }
  else if (formID === "formSignIn") {
    document.getElementById("sign-in").addEventListener("click", () => {
      console.log("Entro al if de handle");
      toggleSignIn(email, password)
      router.navigateTo("/feed");
      listenPost();
    });
  }
}

activateRouter();





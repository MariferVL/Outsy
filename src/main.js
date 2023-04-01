import { Router } from "./router/router.js";
import { toggleSignIn, handleSignUp } from "./lib/barrel.js";
import authApp from "./lib/barrel.js";

/**
 *
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
 * 
 */
function activateRouter() {
  Router.load("home");

  const signInHandler = () => {
    Router.loadBody("signIn");
    const {formID, email, password} = listenForm("formSignIn", "sign-in");
    toAuth(formID, email, password);


  };
  const signUpHandler = () => {
    Router.loadBody("signUp");
    const {formID, email, password } = listenForm("formSignUp", "sign-up");
    toAuth(formID, email, password);


  };

  const aboutHandler = () => {
    Router.load("about");
  };

  document.getElementById("signIn").addEventListener("click", signInHandler);
  document.getElementById("signUp").addEventListener("click", signUpHandler);
  document.getElementById("signUp2").addEventListener("click", signUpHandler);
  document.getElementById("about").addEventListener("click", aboutHandler);
}

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
 *
 * @param {*} input
 * @returns
 */
function validateInput(input, type) {
  const Inputvalue = input.value;
  let valid = true;
  /* if (type === "email") {
    console.log("emailValue: " + Inputvalue);
    if (validateEmail(Inputvalue)) {
      return;
    } else {
      input.setCustomValidity(
        "Por favor, ingresa un correo electrónico válido"
      );
      valid = false;
    }
  } else if (type === "pass") {
    console.log("PassValue: " + Inputvalue);
    if (validatePassword(Inputvalue)) {
      return;
    } else {
      input.setCustomValidity("Por favor, ingresa una contraseña válida");
      valid = false;
    }
  } */
  return valid;
}

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
function enableButtons(idElement) {
  const elementButton = document.getElementById(idElement);
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  showPassword();
  if (elementButton) {
    validateInput(emailInput, "email");
    validateInput(passwordInput, "pass");
  }
  console.log("Este debería ser email y p " + emailInput.value + passwordInput.value);
  return [emailInput.value, passwordInput.value];
}

async function listenForm(formID, buttonID) {
  const data = new Promise((resolve, reject) => {
    document.getElementById(formID).addEventListener("submit", () => {
      const userData = enableButtons(buttonID);
      resolve(userData);
      console.log("Esto es userdata " + userData);
    }, { once: true });
    
  });
 
  //Using array destructuring

  data.then((d) => {
    console.log("Esto es data " + d);
    console.log("email lista: " + d[0] + d[1]);
  })

  return formID, email, password;
  // FIXME: Checkpoint. Debería retornar a la view, pero hasta aquí retorna email y contraseña
}

function toAuth(formID, email, password) {

  if (formID === "formSignUp") {
      const emailIgm = document.createElement("img");
      emailIgm.src = "./images/emailVerification.png";
      emailIgm.className = "emailImg";
      const main = document.getElementById("signUp");
      main.replaceWith(emailIgm);

      if (handleSignUp(authApp, email, password)) {
        Router.loadBody("feedView");
      }
  } else if (formID === "formSignIn") {
      if (toggleSignIn(authApp, email, password)) {
        Router.loadBody("feedView");
      }
  }

}

activateRouter();
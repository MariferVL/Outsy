import { ROUTER } from "./router/router.js";
import { paths } from "./router/routes.js";
import { initApp, toggleSignIn } from "./lib/barrel.js";


function scrollFunction() {
  const navbar = document.getElementById("navbar");
  const logo = document.getElementById("logo");
  if (navbar && logo) {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
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


function initializeRouter() {
  const Router = new ROUTER(paths);
  Router.load("home");

  const signInHandler = () => {
    Router.loadBody("signIn");
    enableButtons("sign-in");
    
  };
  const signUpHandler = () => {
    Router.loadBody("signUp");
    enableButtons("sign-up");
    
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
 * Change button attribute to disable
 */
function enableButtons(idElement) {
  const elementButton = document.getElementById(idElement);
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  if (detectElement(idElement)) {
    if (validateInput(emailInput) && validateInput(passwordInput)){
      elementButton.disabled = true;  

    } 
  } 
  return emailInput.value, passwordInput.value;
}



//FIXME: terminar
function validateInput(input){
  if (input.length < 4) {
    emailInput.setCustomValidity("Por favor, ingresa un correo electrónico.");
  }
    return;
  }

 emailInput.setCustomValidity("Por favor, ingresa un correo electrónico.");
  

/**
 * Detect elements from views DOM with ID
 */
function detectElement(elementID) {
  const element = document.getElementById(elementID);
  let detected = false;
  if (element) {
    detected = true;
  } 
  return detected;  
}

// function detectButton(){
//   const signIn = document.getElementById("sign-in");
//   const signOut = document.getElementById("sign-up");
  
//   if (signIn) {
    
//     signIn.addEventListener("click", toggleSignIn, false);
    
//   } else if (signOut) {
//     signOut.addEventListener("click", handleSignUp, false);
//   }
// }

initializeRouter();




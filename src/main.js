import { ROUTER } from "./router/router.js";
import { paths } from "./router/routes.js";
import funct from "./lib/barrel.js";
import { initApp } from "./lib/emailAuth.js";

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("navbar").style.padding = "30px 10px";
    document.getElementById("logo").style.fontSize = "25px";
  } else {
    document.getElementById("navbar").style.padding = "80px 10px";
    document.getElementById("logo").style.fontSize = "35px";
  }
}

// eslint-disable-next-line func-names
window.onscroll = function () {
  scrollFunction();
};

function initializeRouter() {
  const Router = new ROUTER(paths);
  Router.load("home");

  const signInHandler = () => {
    Router.loadBody("signIn");
  };
  const signUpHandler = () => {
    Router.loadBody("signUp");
  };
  const aboutHandler = () => {
    Router.load("about");
  };

  document.getElementById("signIn").addEventListener("click", signInHandler);
  document.getElementById("signUp").addEventListener("click", signUpHandler);
  document.getElementById("signUp2").addEventListener("click", signUpHandler);
  document.getElementById("about").addEventListener("click", aboutHandler);
}

initializeRouter();
document.addEventListener("DOMContentLoaded", function () {
  // Esperar a que se cree la vista de inicio de sesión
  const loginView = document.getElementById("signInView");
  const logupView = document.getElementById("signUpView");

  if (loginView || logupView) {
    initApp();
  }
});
// let Router;

// function initializeRouter() {
//   Router = new ROUTER(paths);
//   Router.load('home');
// }

// window.onload = () => {
//   initializeRouter();
//   document.getElementById('signIn').addEventListener('click', () => { Router.loadBody('signIn'); });
//   document.getElementById('signUp').addEventListener('click', () => { Router.loadBody('signUp'); });
//   document.getElementById('signUp2').addEventListener('click', () => { Router.loadBody('signUp'); });
//   document.getElementById('about').addEventListener('click', () => { Router.load('about'); });
// };

/* // Initialize authentication email/password
window.onload = function () {
  funct.initApp();
}; */

import { ROUTER } from "./router/router.js";
import { paths } from "./router/routes.js";
import { initApp } from "./lib/barrel.js";


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
    initApp()
  };
  const signUpHandler = () => {
    Router.loadBody("signUp");
    initApp()
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




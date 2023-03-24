import { ROUTER } from './router/router.js';
import { paths } from './router/routes.js';
import funct from "./lib/barrel.js";

let Router;

function initializeRouter() {
  Router = new ROUTER(paths);
  Router.load('home');
}

window.onload = () => {
  initializeRouter();
  function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      document.getElementById('navbar').style.padding = '30px 10px';
      document.getElementById('logo').style.fontSize = '25px';
    } else {
      document.getElementById('navbar').style.padding = '80px 10px';
      document.getElementById('logo').style.fontSize = '35px';
    }
  }

  // eslint-disable-next-line func-names
  window.onscroll = function () {
    scrollFunction();
  };

  document.getElementById('signIn').addEventListener('click', () => { Router.loadBody('signIn'); });
  document.getElementById('signUp').addEventListener('click', () => { Router.loadBody('signUp'), funct.initApp() });
  document.getElementById('signUp2').addEventListener('click', () => { Router.loadBody('signUp'); });
  document.getElementById('about').addEventListener('click', () => { Router.load('about'); });
};

/* // Initialize authentication email/password
window.onload = function () {
  funct.initApp();
}; */


// When the user scrolls down 80px from the top of the document,
// resize the navbar's padding and the logo's font size

/* const contentRoot = document.getElementById("root");
contentRoot.innerHTML =  */

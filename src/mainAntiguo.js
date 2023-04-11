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

/* AGREGADA */
// /**
//  * Display the first view of the website
//  */
// function manageRoutes() {
//   router.navigateTo("/home");

//   const signInHandler = () => {
//     router.navigateTo("/signin");
//     listenForm("formSignIn", "sign-in");

//   };
//   const signUpHandler = () => {
//     router.navigateTo("/signup");
//     listenForm("formSignUp", "sign-up");

//   };

//   const aboutHandler = () => {
//     router.navigateTo("/about");
//   };

//   document.getElementById("signIn").addEventListener("click", signInHandler);
//   document.getElementById("signUp").addEventListener("click", signUpHandler);
//   // document.getElementById("signUp2").addEventListener("click", signUpHandler);
//   document.getElementById("about").addEventListener("click", aboutHandler);
// }

/* AGREGADA */
// /**
//  * Validate email input structure
//  * @param {*} email
//  * @returns boolean
//  */
// function validateEmail(email) {
//   const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   console.log("valdateEmail: " + regexEmail.test(email));
//   return regexEmail.test(email);
// }


/* AGREGADA */
// /**
//  * Validate password input structure
//  * @param {*} password
//  * @returns boolean
//  */
// function validatePassword(password) {
//   const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
//   console.log("validatePassword: " + regexPassword.test(password));

//   return regexPassword.test(password);
// }

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

/* AGREGADA */
// /**
//  * Change button attribute to disable
//  * @param {*} idElement
//  * @returns
//  */
// function enableButtons(formID, idElement) {
//   const elementButton = document.getElementById(idElement);
//   const emailInput = document.getElementById("email");
//   const passwordInput = document.getElementById("password");
//   const form = document.getElementById(formID);
//   console.log("button y id: " + elementButton + " " + idElement);
//   console.log("email: " + emailInput);
//   console.log("pass: " + passwordInput);

//   elementButton.disabled = true;

//   if (elementButton) {
//     emailInput.addEventListener('input', () => {
//       if (validateEmail(emailInput.value) && validatePassword(passwordInput.value)) {
//         elementButton.disabled = false;
//       } else {
//         elementButton.disabled = true;
//       }
//     });

//     passwordInput.addEventListener('input', () => {
//       if (validateEmail(emailInput.value) && validatePassword(passwordInput.value)) {
//         elementButton.disabled = false;
//       } else {
//         elementButton.disabled = true;
//       }
//     });

//     if (elementButton.disabled == false) {
//       console.log("Este debería ser email y pass: " + emailInput.value + passwordInput.value);
//       return [emailInput.value, passwordInput.value];
//     }
//   }


// }



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
function listenForm() {
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
  console.log();
  sendValidatedData(formID, userData[0], userData[1])
  console.log("Esto es data " + userData);
  console.log("email lista: " + userData[0] + userData[1])

  return formID, email, password;
}

/* AGREGADA */
// /**
//  * 
//  * @param {*} formID 
//  * @param {*} email 
//  * @param {*} password 
//  */
// function sendValidatedData(formID, email, password) {
//   console.log("Entro a sendValidatedData " + formID + email + password);
//   if (formID === "formSignUp") {
//     document.getElementById("sign-up").addEventListener("click", () => {
//       const emailIgm = document.createElement("img");
//       emailIgm.src = "./images/emailVerification.png";
//       emailIgm.className = "emailImg";
//       const main = document.getElementById("signUpView");
//       main.replaceWith(emailIgm);
//       console.log("Entro al if de handle");
//       handleSignUp(email, password);
//     });
//   }
//   else if (formID === "formSignIn") {
//     document.getElementById("sign-in").addEventListener("click", () => {
//       console.log("Entro al if de handle");
//       toggleSignIn(email, password)
//       router.navigateTo("/feed");
//       listenPost();
//     });
//   }
// }

activateRouter();






















/* FORM SECTION */

let currentTab = 0;
document.addEventListener("DOMContentLoaded", function () {
  showTab(currentTab);
  document
    .getElementById("prevBtn")
    .addEventListener("click", () => nextPrev(-1));
  document
    .getElementById("nextBtn")
    .addEventListener("click", () => nextPrev(1));
});

function showTab(n) {
  const x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n === 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n === x.length - 1) {
    document.getElementById("nextBtn").innerHTML =
      '<i class="fa fa-angle-double-right"></i>';
  } else {
    document.getElementById("nextBtn").innerHTML =
      '<i class="fa fa-angle-double-right"></i>';
  }
  fixStepIndicator(n);
}

function nextPrev(n) {
  const x = document.getElementsByClassName("tab");
  if (n === 1 && !validateForm()) return false;
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    document.getElementById("nextprevious").style.display = "none";
    document.getElementById("all-steps").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("text-message").style.display = "block";

    dataAPI();

    // Enable selector
    const elements = document.querySelectorAll(".form-select");
    elements.forEach((element) => {
      element.disabled = false;
    });
  } else {
    showTab(currentTab);
  }
}

function validateForm() {
  let i,
    valid = true;
  const x = document.getElementsByClassName("tab");
  const y = x[currentTab].getElementsByTagName("input");
  for (i = 0; i < y.length; i++) {
    if (y[i].value === "") {
      y[i].className += " invalid";
      valid = false;
    } else {
      if (currentTab === 2) {
        const input = y[i].value;
        const dateSplitted = input.split("-");
        const userYear = dateSplitted[0];
        const dateTimeRegex = /^\d{1,4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
        if (dateTimeRegex.test(input)) {
          const year = input.substring(0, 4);
          if (year <= new Date().getFullYear()) {
            y[i].setCustomValidity("");
          } else {
            y[i].setCustomValidity(
              " ¡Ey!, ✋🏻⚠️ No tan rápido.\n Disfruta tu año, el " +
              userYear +
              " ya llegará. 😉"
            );
            y[i].className += " invalid";
            valid = false;
          }
        } else {
          y[i].setCustomValidity(
            "Wow 😲 ¿Vienes del futuro?\nEl año " +
            userYear +
            " todavía no llega. 😅"
          );
          y[i].className += " invalid";
          valid = false;
        }
      }
    }
  }
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid;
}



function fixStepIndicator(n) {
  let i;
  const x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}

/* END FORM SECTION */

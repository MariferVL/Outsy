import Router from "./router/router.js";
import { toggleSignIn, handleSignUp, signInWithGoogle } from "./lib/emailAuth.js";
import { listenPostForm } from "./js/postDOM.js";


const router = new Router();
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






/**
 * Listen when user submit info clicking button 
 * @param {*} formID 
 * @param {*} buttonID 
 * @returns 
 */
function listenForm(formID, userData) {
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

    //Test
    return email;
}



/**
 * 
 * @param {*} formID 
 * @param {*} email 
 * @param {*} password 
 */
function sendValidatedData(formID, email, password) {
    console.log("Entro a sendValidatedData " + formID + email + password);
    if (formID === "formSignUp") {
        console.log("entró a imagen");
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
            toggleSignIn(email, password);
            router.navigateTo("/feed");
            listenPost();
        });
    }
}


async function validateForm() {

    const email = document.getElementById('email');
    const password = document.getElementById('password');

    // Email validation
    if (!email.value) {
        email.setCustomValidity('Please enter an email address.');
        return;
    }

    if (!validateEmail(email.value)) {
        email.setCustomValidity('Please enter a valid email address.');
        return;
    }

    // Password validation
    if (!password.value) {
        password.setCustomValidity('Please enter a password.');
        return;
    }

    if (!validatePassword(password.value)) {
        password.setCustomValidity('Password must be at least 8 characters long.');
        return;
    }
    console.log("llegóa final validación");
    // Inputs are valid
    return {
        email: email.value,
        password: password.value,
    };
}



/**
 * Display the website views
 * IIFE 
 */
(function () {
    router.navigateTo("/home");

    const signInHandler = async () => {
        router.navigateTo("/signin");
        const userData = await validateForm();
        if (userData) {
            listenForm("formSignIn", userData);
        }
    };
    
    const signUpHandler = async () => {
        router.navigateTo("/signup");
        const userData = await validateForm();
        if (userData) {
            sendValidatedData("formSignUp", userData.email, userData.password);
        }
    };
    

    const aboutHandler = () => {
        router.navigateTo("/about");
    };

    document.getElementById("signIn").addEventListener("click", signInHandler);
    document.getElementById("signUp").addEventListener("click", signUpHandler);
    // document.getElementById("signUp2").addEventListener("click", signUpHandler);
    document.getElementById("about").addEventListener("click", aboutHandler);

})()





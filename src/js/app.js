// When the user scrolls down 80px from the top of the document,
// resize the navbar's padding and the logo's font size
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

// Get the Element with the Id 'root'
const rootDiv = document.getElementById('root');

// Declare the variables for home, about & sign up html pages
let homeTemp = '';
let aboutTemp = '';
let signInTemp = '';
let signUpTemp = '';
let profileTemp = '';
let feedTemp = '';
let postDetailTemp = '';
let postEditTemp = '';

/**
 *
 * @param {String} page - Represents the page information that needs to be retrieved
 * @returns {String} resHtml - The Page's HTML is returned from the async invocation
 */

const loadPage = async (page) => {
  const response = await fetch(page);
  const resHtml = await response.text();
  return resHtml;
};

/**
 * The Async function loads all HTML to the variables 'home', 'about' & 'contact'
 */
const loadAllPages = () => {
  homeTemp = loadPage('../templates/home.html');
  aboutTemp = loadPage('../templates/about.html');
  signInTemp = loadPage('../templates/sign-in.html');
  signUpTemp = loadPage('../templates/sign-up.html');
  profileTemp = loadPage('../templates/profile.html');
  feedTemp = loadPage('../templates/feed.html');
  postDetailTemp = loadPage('../templates/post-detail.html');
  postEditTemp = loadPage('../templates/post-edit.html');
};

/**
 * The Main Function is an async function that first loads All Page HTML to the variables
 * Once the variables are loaded with the contents, then they are assigned to the 'routes' variable
 */
let routes;
const main = () => {
  loadAllPages();
  rootDiv.innerHTML = 'homeTemp';
  routes = {
    '/': homeTemp,
    // '/about': aboutTemp,
    '/sign-in': signInTemp,
    '/sign-up': signUpTemp,
    '/feed': feedTemp,
    '/post/create': postEditTemp,
    '/post/edit': postEditTemp,
    '/post/detail': postDetailTemp,
    '/profile': profileTemp,
  };
};

//  Invoke the Main function
main();

/**
 *
 * @param {String} pathname
 *  Pass the 'pathname' passed from onClick function of the link (index.html)
 * The function is invoked when any link is clicked in the html.
 * The onClick event on the html invokes the onNavClick & passes the pathname as param
 */
const onNavClick = (pathname) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  rootDiv.innerHTML = routes[pathname];
};

/**
 * The Function is invoked when the window.history's state changes
 */
window.onpopstate = () => {
  rootDiv.innerHTML = 'homeTemp';
};

document
  .getElementById('signUp')
  .addEventListener('click', onNavClick('/sign-up'));

document
  .getElementById('about')
  .addEventListener('click', onNavClick('/about'));

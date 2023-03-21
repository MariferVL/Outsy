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



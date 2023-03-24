

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

function validateData() {
  console.log('entro a validateDta');
  let result;
  if (email.length < 8) {
    console.log('entro al If');
    result = email.setCustomValidity('Por favor, ingresa un correo electrónico válido.');
  } else if (email.length >= 8) {
    console.log('entro al 1er else If');
    result = true;
  }
  if (password.length < 8) {
    console.log('entro al 2ndo else If');
    result = password.setCustomValidity('Tu contraseña debe contener al menos 8 caracteres');
  } else if (password.length >= 8) {
    console.log('entro al 3er else If');
    result = true;
  } else {
    console.log('entro al else');
  }
  return result;
}





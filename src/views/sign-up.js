export const signUp = `
<section id="signUpView" class="background-radial-gradient overflow-hidden">
<div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
  <div class="row gx-lg-5 align-items-center mb-5">
    <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
      <h1 class="my-5 display-5 fw-bold ls-tight" style="color: darkturquoise">
      Bienvenido a Outsy <br />
        <span style="color: beige">¿Alguien dijo salir?</span>
      </h1>
      <p class="mb-4 opacity-70" style="color: hsl(218, 81%, 85%)">
      &nbsp;&nbsp; &nbsp;¡Estamos tan emocionados de tenerte aquí! Nuestro objetivo es
      siempre ofrecerte un espacio seguro y divertido donde puedas
      conectarte con tus amigos y conocidos. Sólo necesitas registrarte
      con un correo electrónico válido para empezar a explorar y 
      disfrutar de la experiencia Outsy.
      </p>
    </div>
    <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
      <div class="card bg-glass">
        <div class="card-body px-4 py-5 px-md-5">
          <form id="formSignUp"> 
          <!-- Username input -->
          <div class="form-outline mb-4">
            <input type="text" id="userName" class="form-control" required/>
            <label class="form-label" for="userName">Nombre de Usuario</label>
          </div>
            <!-- Email input -->
            <div class="form-outline mb-4">
              <input type="email" id="email" class="form-control" required/>
              <label class="form-label" for="email">Correo Electrónico</label>
            </div>
            <!-- Password input -->
            <div class="form-outline mb-4">
              <input type="password" id="password" class="form-control" required/>
              <label class="form-label" for="password">Contraseña</label> <br>
              <input type="checkbox" id="showPassword" name="showPassword">
              <label for="showPassword">Mostrar contraseña</label>
              <ul>
                  <li>8- 15 caracteres</li>
                  <li>Al menos una letra mayúscula</li>
                  <li>Al menos una letra minúscula</li>
                  <li>Al menos un dígito</li>
                  <li>Sin espacios en blanco</li>
                  <li>Al menos 1 caracter especial</li>
              </ul>
            </div>
            <!-- Repeat password input -->
            <div class="form-outline mb-4">
              <input type="password" id="repeatPassword" class="form-control" required/>
              <label class="form-label" for="repeatPassword">Repetir Contraseña</label>
            </div>
            <!-- Checkbox -->
            <div class="form-check d-flex justify-content-center mb-4">
              <input class="form-check-input me-2" type="checkbox" value="" id="appTerms" required/>
              <label class="form-check-label text-black" for="appTerms">
                      Acepto los <a href="#!" class="text-blue"><u>Términos y Condiciones</u></a>
                    </label>
            </div>
            <!-- Submit button -->
            <button id="sign-up" class="btn btn-primary btn-block mb-4">
              Registrarme
            </button>
            
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</section>`

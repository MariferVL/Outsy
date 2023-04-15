export const signIn = `
<section id="signInView" class="background-radial-gradient overflow-hidden">

    <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
      <div class="row gx-lg-5 align-items-center mb-5" form-content>
        <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
          <h1 class="my-5 display-5 fw-bold ls-tight" style="color: darkturquoise">
            Bienvenido a Outsy <br />
            <span style="color: beige">¿Alguien dijo salir?</span>
          </h1>
          <p class="mb-4 opacity-70" style="color: hsl(218, 81%, 85%);text-align: justify;">
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
              <form id="formSignIn" class: "requires-validation" novalidate> 
                
              <!-- Email input -->
                <div class="form-outline mb-4">
                  <input type="email" id="email" class="form-control" required/>
                  <label class="form-label" for="email">Correo Electrónico</label>
                  <div class="valid-feedback">El email es correcto</div>
                  <div class="invalid-feedback">El email no es válido</div>
                </div>
  
                <!-- Password input -->
                <div class="form-outline mb-4">
                  <input type="password" id="password" class="form-control" required/>
                  <label class="form-label" for="password">Contraseña</label> <br>
                  <input type="checkbox" id="showPassword" name="showPassword">
                  <label for="showPassword">Mostrar contraseña</label>
                  <div class="valid-feedback">La contraseña es correcta</div>
                  <div class="invalid-feedback">La contraseña no es válida/div>
                </div>
  
                <!-- Checkbox -->
                <div class="form-check d-flex justify-content-center mb-4">
                  <input class="form-check-input me-2" type="checkbox" value="" id="remember"/>
                  <label class="form-check-label" for="remember">
                    Recuérdame
                  </label> 
                </div>

                <!-- Simple link -->
                <div class="text-center">
                <button type="button" class="btn btn-link btn-floating mx-1" id="password-reset">¿Olvidaste tu constraseña?</button> 
                </div>

                <!-- Register buttons -->
                <div class="text-center">
                <p>¿No estás registrado? <a href="#!">Registrate</a></p>
  
                <!-- Submit button -->
                <button id="sign-in" class="btn btn-primary btn-block mb-4">
                  Ingresar
                </button>

                <!-- Register buttons -->
                <div class="text-center">
                  <p>o ingresa con:</p>
  
                  <button id="googleAuth" type="button" class="btn btn-primary btn-block mb-4">
                    <i class="fab fa-google"></i>&nbsp; &nbsp; Continuar con Google
                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`

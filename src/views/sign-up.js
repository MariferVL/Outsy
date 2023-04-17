export const signUp = `
<!-- Navbar -->
<section id="base">
  <div class="container">
    <header id="home"
      class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        <img src="images/outsylogo.png" alt="Logo" height="75" class="d-inline-block align-text-top">
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <i
          class="fas fa-angle-double-down fa-lg" style="color: #82c173;"></i>
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse " id="navbarSupportedContent">

        <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li><a id="home" class="nav-link px-2 link-secondary">Home</a></li>
          <li><a href="#features" class="nav-link px-2 link-dark">Características</a></li>
          <li><a id="about" class="nav-link px-2 link-dark">Nosotros</a></li>
          <li><a href="#testimonials" class="nav-link px-2 link-dark">Testimonios</a></li>
          <li><a id="FAQs" class="nav-link px-2 link-dark">Ventajas</a></li>
          <li> <button id="signIn" type="button" class="btn btn-outline-primary me-2">Inicia Sesión</button></li>
          <li><button id="signUp" type="button" class="btn btn-primary">Registrate</button></li>
        </ul>
      </div>
    </header>
  </div>

  <!-- Form -->
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
            <div class="form-check d-flex justify-content-center mb-4">
            <button id="sign-up" class="btn btn-primary btn-block mb-4">
              Registrarme
            </button>
            </div>
            
            
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</section>`

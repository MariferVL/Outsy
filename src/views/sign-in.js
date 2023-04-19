export const signIn = `
<<!-- Navbar -->
<section id="base">
  <div class="container">
    <header id="home">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand" href="#home">
                <img src="images/outsylogo.png" alt="Logo Outsy" height="75">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="características" href="#features">Características</a>
                    </li>
                    <li class="nav-item">
                        <a id="about" class="nav-link" href="#">Nosotros</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#testimonials">Testimonios</a>
                    </li>
                    <li class="nav-item">
                        <button id="signIn" type="button" class="btn-outsy">Inicia Sesión</button>
                    </li>
                    <li class="nav-item">
                        <button id="signUp" type="button" class="btn-outsy">Registrate</button>
                    </li>
                    <!-- <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li> -->
                    <!-- <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
          </li> -->
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button  class="btn-search" type="submit">Search</button>
                </form>
            </div>
        </div>
      </nav>
    </header>
  </div>

  <!-- Form -->

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
                  <input class="form-check-input" type="checkbox" id="showPassword" name="showPassword">
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
                <button id="sign-in" class="btn-outsy">
                  Ingresar
                </button>

                <!-- Register buttons -->
                <div class="text-center">
                  <p>o ingresa con:</p>
  
                  <button id="googleAuth" type="button" class="btn-search mb-4">
                    <i class="fab fa-google"></i>
                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`

export const about = `
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

  <!-- About Us -->
<section class="background-aboutus">
  <div class="container py-5">
    <div class="row d-flex justify-content-center">
      <div id="about-text" class="col-md-10 col-xl-8 text-center">
        <h1 class="fw-bold mb-4">Acerca de Nosotras</h1>
        <p class="mb-4 pb-2 mb-md-5 pb-md-0">
          ¡En Outsy la fiesta nunca para! Nos encanta salir, hacer amigos, conocer
          muchos lugares diferentes y tener nuevas aventuras, ¿Ya nos conoces? 
          Nosotras somos el equipo Outsy
        </p>
      </div>
    </div>

    <div class="row text-center">
      <div class="col-md-4 mb-4 mb-md-0">
        <div class="card">
          <div class="card-body py-4 mt-2">
            <div class="d-flex justify-content-center mb-4">
              <img src= "images/about/marifer.png"
                class="photos-about shadow-1-strong" width="100" height="100" />
            </div>
            <h5 class="font-weight-bold">Marifer</h5>
            <h6 class="font-weight-bold my-3">Creadora de Outsy</h6>
            <p class="mb-2">
            Caminadora modo Forest Gump <br>
            Melómana y Cinéfila <br>
            Viajera Permanente <br>
            Consejera en mis tiempos libres
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-4 mb-md-0">
        <div class="card">
          <div class="card-body py-4 mt-2">
            <div class="d-flex justify-content-center mb-4">
              <img src="images/about/xochitl.png"
                class="photos-about shadow-1-strong" width="100" height="100" />
            </div>
            <h5 class="font-weight-bold">Xochitl</h5>
            <h6 class="font-weight-bold my-3">Creadora de Outsy</h6>
            <p class="mb-2">
            Amante del arte y la música <br>
            Con el ritmo en la sangre <br>
            Con ganas de comerme el mundo (literalmente)
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-0">
        <div class="card">
          <div class="card-body py-4 mt-2">
            <div class="d-flex justify-content-center mb-4">
              <img src="images/about/gaby.png"
                class="photos-about shadow-1-strong" width="100" height="100" />
            </div>
            <h5 class="font-weight-bold">Gaby</h5>
            <h6 class="font-weight-bold my-3">Creadora de Outsy</h6>
            <p class="mb-2">
            Catadora de margaritas <br>
             Entusiasta del cine de horror <br> 
             Fan de los conciertos y las gomitas <br>
            Mi hobbie es bailar hasta cerrar el club
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      `;
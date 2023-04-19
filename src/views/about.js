export const about = `
<!-- Navbar -->
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
  </section>

  <!-- About Us -->
<section class="aboutus">
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

    <div id="ourPictures" class="row text-center">
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
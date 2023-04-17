export const feed = `  
<body class="bg-light">  
<!-- Navbar -->
<nav class="navbar navbar-expand-md navbar-dark">
<div class="container-fluid " id="navbar-feed">
  <a class="navbar-brand" href="">
    <img src="images/logo1.png" alt="Logo" width="75" height="75" class="d-inline-block align-text-top">
  </a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
    aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse " id="navbarSupportedContent">
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 ">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="">Dashboard</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="">Notificaciones</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="">Perfil</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="form" role="button" data-bs-toggle="dropdown"
          aria-expanded="false">
          Menú
        </a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" id="post">Crear Publicación</a></li>
          <li>
            <hr class="dropdown-divider">
          </li>
          <li><a class="dropdown-item" href="">Ajustes</a></li>
          <li><a class="dropdown-item" href="">Cerrar Sesión</a></li>
        </ul>
      </li>
    </ul>
    <form class="d-flex">
      <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Busqueda">
      <button class="btn btn-outline-light goldButton" type="submit">Buscar</button>
    </form>
  </div>
</div>
</nav>

<!-- Posts -->
  <main id="feed" class="container">
  <section id="posts">
  <div class="my-3 p-3 bg-body rounded shadow-sm">
    <h2 class="border-bottom pb-2 mb-0">Publicaciones Recientes</h2>

      <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
        <div class="d-flex justify-content-between">
          <strong class="text-gray-dark">Full Name</strong>
        </div>
        <span class="d-block">@username</span>
      </div>
    </div>
    <div class="d-flex text-muted pt-3">
  </div>
</main>

<!-- Post Example -->
<div class="container mt-5 mb-5">
    <div class="row d-flex align-items-center justify-content-center">
        <div class="col-md-6">
            <div class="card">
            <div class="d-flex text-muted pt-3" id="postContainer">
                
            </div>
        </div>
    </div>
</div>


    <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>

      <script src="offcanvas-navbar.js"></script>
  </body>
  `;
export const post =
` 
<!-- Navbar -->
<nav class="navbar navbar-expand-md navbar-dark">
<div class="container-fluid " id="navbar-feed">
  <a class="navbar-brand" href="">
    <img src="images/outsylogo.png" alt="Logo" height="75" class="d-inline-block align-text-top">
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

<!-- Form Create Post -->
<section id="addPostForm">
<div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
    <div class="row gx-lg-5 align-items-center mb-5">
        <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div class="card bg-glass">
                <div class="card-body px-4 py-5 px-md-5">
                  <h2 class="text-center" style="color: #82C173">Cuéntale a tus amigos qué quieres hacer</h2><br>
                    <form method="POST" enctype="multipart/form-data">
                    <!-- Post Title input -->
                    <div class="form-outline mb-4">
                        <label class="form-label" for="postTitle">Título</label>
                        <input type="text" id="postTitle" class="form-control" name="postTitle" required />
                    </div>
                    <!-- Date input -->
                    <div class="form-outline mb-4">
                        <label class="form-label" for="meeting-time">Fecha</label>
                        <input type="datetime-local" id="postTime" class="form-control" name="meeting-time"
                            value="2023-04-16T19:30" required />
                    </div>
                    <!-- Location input -->
                    <div class="form-outline mb-4">
                        <label class="form-label" for="postLocation">Lugar</label>
                        <input type="text" id="postLocation" class="form-control" name="postTitle" required />
                    </div>
                    <!-- Description input -->
                    <div class="form-outline mb-4">
                        <label class="form-label" for="postText">Descripción</label>
                        <textarea id="postContent" name="postText" class="form-control" required></textarea>
                    </div>
                    <!-- Image -->
                    <div class="form-outline mb-4">
                        <label class="form-label" for="postImage">Imagen</label>
                        <input class="form-control" type="file" id="postImage" name="postImage" />
                    </div>
                    <!-- Image -->
                    <div class="form-outline mb-4">
                        <label class="form-label" for="postPrivacy">Privacidad</label>
                        <select class="form-control" id="postPrivacy" name="postPrivacy">
                            <option value="public">Publico</option>
                            <option value="friends">Amigos</option>
                            <option value="private">Privado</option>
                        </select>
                    </div>
                        <!-- Submit button -->
                        <div class="form-check d-flex justify-content-center mb-4">
                            <button id="addPostButton" class="btn btn-primary btn-block mb-4" type="submit">Create
                                post</button>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</section>
`

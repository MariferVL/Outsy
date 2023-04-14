export const home = `

    <section id="main" class="container-fluid position-relative p-0">
      <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true"
            aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="images/home/carrusela.png" width="100%">
            <div class="container">
              <div class="carousel-caption text-start">
             
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <img class="bd-placeholder-img" width="100%" height="100%" src="images/home/carruselb.png"
              aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
              <rect width="100%" height="100%" fill="#777" />
            <div class="container">
              <div class="carousel-caption">
              
              </div>
            </div>
          </div>
          <div class="carousel-item">
          <img class="bd-placeholder-img" width="100%" height="100%" src="images/home/carruselc.png"
          aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
          <rect width="100%" height="100%" fill="#777" />
            <div class="container">
              <div class="carousel-caption text-end">
              </div>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </section>
    <section id="Features">
      <!-- Marketing messaging and featurettes
  ================================================== -->
      <!-- Wrap the rest of the page in another container to center all the content. -->

      <div id="features" class="container marketing">
        <!-- START THE FEATURETES -->
        <div  class="row featurette">
          <div class="col-md-7">
            <h2 class="featurette-heading fw-normal lh-1">Regístrate en Outsy<span class="text-muted"></span></h2>
            <p class="lead">Crea tu username, ingresa tu correo electrónico y crea una constraseña para unirte a 
            nuestra comunidad, ¡Tus amigos están esperando!</p>
          </div>
          <div class="col-md-5">
            <img class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500"
              height="500" src="images/home/featuresa.png" 
              preserveAspectRatio="xMidYMid slice" focusable="false">
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#eee" /><text x="50%" y="50%" fill="#aaa" dy=".3em"></text>
          </div>
        </div>

        <hr class="featurette-divider">

        <div class="row featurette">
          <div class="col-md-7 order-md-2">
            <h2 class="featurette-heading fw-normal lh-1">Publica los planes que tienes en mente<span class="text-muted"></span></h2>
            <p class="lead">¿Hay alguna película que te encantaría ver o tu museo favorito tiene una exposición por tiempo limitado? 
            ¡Compártelo con tus amigos! Cuéntales tu plan y vayan juntos…</p>
          </div>
          <div class="col-md-5 order-md-1">
            <img class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500"
              height="500" src="images/home/featuresb.png" 
              preserveAspectRatio="xMidYMid slice" focusable="false">
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#eee" /><text x="50%" y="50%" fill="#aaa" dy=".3em"></text>
          </div>
        </div>

        <hr class="featurette-divider">

        <div class="row featurette">
          <div class="col-md-7">
            <h2 class="featurette-heading fw-normal lh-1">¡No más aburrimiento los fines de semana! <span
                class="text-muted"></span>
            </h2>
            <p class="lead">Descubre nuevas opciones para salir con tus amigos en Outsy. 
            Encuentra los mejores planes para pasar un buen rato juntos.</p>
          </div>
          <div class="col-md-5">
            <img class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500"
              height="500" src="images/home/featuresc.png" 
              preserveAspectRatio="xMidYMid slice" focusable="false">
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#eee" /><text x="50%" y="50%" fill="#aaa" dy=".3em"></text>
          </div>
        </div>
      </div><!-- /.container -->

      <hr class="featurette-divider">

    </section>

    <section id="testimonials">
      <article>
        <!-- Carousel wrapper -->
        <div id="usersTestimonials" class="carousel carousel-dark slide text-center" data-mdb-ride="carousel">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#usersTestimonials" data-bs-slide-to="0" class="active"
              aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#usersTestimonials" data-bs-slide-to="1"
              aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#usersTestimonials" data-bs-slide-to="2"
              aria-label="Slide 3"></button>
          </div>
          <!-- Inner -->
          <div class="carousel-inner">
            <!-- Single item -->
            <div class="carousel-item active" data-bs-interval="1000">
              <div class="container">
                <div class="row">
                  <div class="col-lg-4">
                    <img class="rounded-circle shadow-1-strong mb-4"
                      src="images/home/testimonioa.png" alt="avatar" />
                    <h5 class="mb-3">Ana</h5>
                    <p class="text-muted">
                      <i class="fas fa-quote-left pe-2"></i>
                      ¡Me encanta Outsy! Desde que cree mi perfil no me pierdo ninguna fiesta, he hecho 
                      un montón de amigos. Además he visto amigos que veía en años
                    </p>
                    <ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
                      <li><i class="fas fa-star fa-sm"></i></li>
                      <li><i class="fas fa-star fa-sm"></i></li>
                      <li><i class="fas fa-star fa-sm"></i></li>
                      <li><i class="fas fa-star fa-sm"></i></li>
                      <li><i class="fas fa-star fa-sm"></i></li>
                    </ul>
                  </div>

                  <div class="col-lg-4 d-none d-lg-block">
                    <img class="rounded-circle shadow-1-strong mb-4"
                    src="images/home/testimoniob.png"  alt="avatar" />
                    <h5 class="mb-3">Daniel</h5>

                    <p class="text-muted">
                      <i class="fas fa-quote-left pe-2"></i>
                      Antes nunca veía a mis amigos, era un lío ponernos todos de acuerdo,
                      pero con Outsy nos juntamos una vez a la semana. Siempre hay un plan difente
                    </p>
                    <ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
                      <li><i class="fas fa-star fa-sm"></i></li>
                      <li><i class="fas fa-star fa-sm"></i></li>
                      <li><i class="fas fa-star fa-sm"></i></li>
                      <li><i class="fas fa-star fa-sm"></i></li>
                      <li>
                        <i class="fas fa-star-half-alt fa-sm"></i>
                      </li>
                    </ul>
                  </div>

                  <div class="col-lg-4 d-none d-lg-block">
                    <img class="rounded-circle shadow-1-strong mb-4"
                    src="images/home/testimonioc.png"  alt="avatar" />
                    <h5 class="mb-3">Maria</h5>
                    <p class="text-muted">
                      <i class="fas fa-quote-left pe-2"></i>
                      El mes pasado conocí una cafetería, fui a una exposición de arte y
                      festejamos el cumpleaños de mi mejor amigo. Nunca creí que podría 
                      hacer tantas cosas con mis amigos                       
                    </p>
                    <ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
                      <li><i class="fas fa-star fa-sm"></i></li>
                      <li><i class="fas fa-star fa-sm"></i></li>
                      <li><i class="fas fa-star fa-sm"></i></li>
                      <li><i class="fas fa-star fa-sm"></i></li>
                      <li><i class="far fa-star fa-sm"></i></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Carousel wrapper -->
      </article>
    </section>
  `;

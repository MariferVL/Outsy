export const postIt = `
<body class="bg-light">
    
<nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" aria-label="Main navigation">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Offcanvas navbar</a>
    <button class="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Dashboard</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Notifications</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Switch account</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Settings</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

<div class="nav-scroller bg-body shadow-sm">
  <nav class="nav" aria-label="Secondary navigation">
    <a class="nav-link active" aria-current="page" href="#">Dashboard</a>
    <a class="nav-link" href="#">
      Friends
      <span class="badge text-bg-light rounded-pill align-text-bottom">27</span>
    </a>
    <a class="nav-link" href="#">Explore</a>
    <a class="nav-link" href="#">Suggestions</a>
    <a class="nav-link" href="#">Link</a>
    <a class="nav-link" href="#">Link</a>
    <a class="nav-link" href="#">Link</a>
    <a class="nav-link" href="#">Link</a>
    <a class="nav-link" href="#">Link</a>
  </nav>
</div>

<div class="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div class="container py-5">
            <div class="section-title text-center position-relative pb-3 mb-4 mx-auto" style="max-width: 600px;">
                <h5 class="fw-bold text-primary text-uppercase">Muro de Post-It </h5>
                <h1 class="mb-0">Aquí encuentras todos los mensajes de esta gran comunidad</h1>
            </div>

            <!-- New Post-it  Start -->
            <div class="container bg-faded">
                
                    <a href="{% url 'post_new' %}" class="btn send animated slideInLeft"  class="top-menu"> 
                       
                    </a>
             
            </div>
            <!-- New Post-it  Start -->

            <!-- Post-it Wall Start -->
            <div class="wall">
               
                    <div class="sticky-container-wall">
                        <div class="sticky-outer">
                            <div class="sticky">
                                <svg width="0" height="0">
                                <defs>
                                    <clipPath id="stickyClip" clipPathUnits="objectBoundingBox">
                                    <path
                                        d="M 0 0 Q 0 0.69, 0.03 0.96 0.03 0.96, 1 0.96 Q 0.96 0.69, 0.96 0 0.96 0, 0 0"
                                        stroke-linejoin="round"
                                        stroke-linecap="square"/>
                                    </clipPath>
                                </defs>
                                </svg>
                                <div class="sticky-content color" >
                                     <p class="postdate" style="font-size: 11px;"><time> publicado: {{post.published_date}}</time></p> 
                                    <p class="posttitle" style="font-size: 33px; padding: 33px"><a href={% url 'post_detail' pk=post.pk %}>{{ post.title}}</a></p>
                                </div>
                            </div>
                        </div>
                    </div>            
                
                <!-- Post-it Wall End -->
            </div>
        </div>
    </div> 
    `
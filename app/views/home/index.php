<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@100;200;300;400;500;600;700;800;900&amp;display=swap" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/media.css">
    <script async src="https://unpkg.com/es-module-shims@1.6.3/dist/es-module-shims.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js"></script>
    <script src="https://unpkg.com/imagesloaded@5/imagesloaded.pkgd.js"></script>
    <script type="importmap">
      {
        "imports": {
          "three": "https://unpkg.com/three@v0.151.3/build/three.module.js",
          "three/addons/": "https://unpkg.com/three@v0.151.3/examples/jsm/"
        }
      }
    </script>
    <title>3D Web Apps</title>
</head>

<body class="d-flex flex-column h-100">
        <main class="flex-shrink-0">
            <nav class="navbar navbar-expand-lg py-3 navbar-custom">
    <div class="container px-5">
        <a class="navbar-brand" href="#" id="navbar-brand-logo">
            <img src="assets/images/cola-logo1.png" alt="Coca Cola Logo" />
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">

                <li class="nav-item">
                    <a class="nav-link" href="#" id="home-link">
                        <div class="d-flex flex-column align-items-center">
                            <i class="bi bi-house"></i>
                            Home
                        </div>
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#" id="models-link">
                        <div class="d-flex flex-column align-items-center">
                            <i class="bi bi-badge-3d"></i>
                            Models
                        </div>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="#" class="nav-link" id="about-link">
                        <div class="d-flex flex-column align-items-center">
                            <i class="bi bi-info-square"></i>
                            About
                        </div>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="#" class="nav-link" id="contact-link">
                        <div class="d-flex flex-column align-items-center">
                            <i class="bi bi-person-lines-fill"></i>
                            Contact
                        </div>
                    </a>
                </li>

                <li class="nav-item media-link-container">
                    <a class="nav-link" href="#" id="media-link">
                        <div class="d-flex flex-column align-items-center">
                            <i class="bi bi-camera2"></i>
                            Media
                        </div>
                    </a>
                </li>

                <li class="nav-item" >
                    <a class="nav-link" href="#" id="dark-mode-link">
                        <div class="d-flex flex-column align-items-center">
                            <i id="dark-mode-icon" class="bi bi-sun"></i>
                            <span>Dark Mode</span>
                        </div>
                    </a>
                </li>

            </ul>
        </div>
    </div>
</nav>

            


            <div id="home-content"></div>

            <div id="models-content" style="display: none;"></div>

            <div id="media-content" style="display: none;"></div>




        <div id="about-popover" style="display: none;">
          <div class="popover-content">
            <div class="popover-arrow"></div>
            <div class="popover-title">About This 3D Application</div>
            <div class="popover-body">This project was build for the 3D Web Apps module at the University of Sussex</div>
          </div>      
        </div>

        


        <footer class="py-4 mt-auto navbar-custom">
            <div class="container px-5">
                <div class="row align-items-center justify-content-between flex-column flex-sm-row">
                    <div class="col-auto">
                      <div class="small m-0 footer-text">Copyright &copy; 2023 Mobile Web 3D Applictions</div>
                    </div>
                    <div class="col-auto">
                        <a class="small" href="#!">Privacy</a>
                        <span class="mx-1">&middot;</span>
                        <a class="small" href="#!">Terms</a>
                        <span class="mx-1">&middot;</span>
                        <a class="small" href="#!">Contact</a>
                    </div>
                </div>
            </div>
        </footer>


<div class="modal fade" id="contactModal" tabindex="-1" aria-labelledby="contactModalLabel" aria-hidden="true">
        <div class="custom-modal-overlay"></div>
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="bookingModalLabel">3D App Contact Details</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  Jacob Moore <br>
                  jlbm20@sussex.ac.uk
              </div>
            </div>
          </div>
        </div>


        <script src="js/jquery-3.6.4.js"></script>
        <script src="https://unpkg.com/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
        <script src="js/bootstrap.js"></script>
        <script src="js/main.js" type="module"></script>
        <script src="js/getJsonData.js"></script>
        <script src="js/models.js" type="module"></script>
        <script src="js/fetch_images.js"></script>
    </body>

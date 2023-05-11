import { createCoke, createCoffee, createSprite } from './models.js';
$(document).ready(function() {
  let modelCreated = false;
  let currentModel;

  function loadContent(file, target) {
    fetch(file)
      .then((response) => response.text())
      .then((data) => {
        document.getElementById(target).innerHTML = data;
      })
      .catch((error) => {
        console.error(`Error fetching ${file}:`, error);
      });
  }

  loadContent("../app/views/home/home.php", "home-content");
  loadContent("../app/views/home/models.php", "models-content");
  loadContent("../app/views/home/media.php", "media-content");

  const homeLink = document.getElementById("home-link");
  const modelsLink = document.getElementById("models-link");
  const mediaLink = document.getElementById("media-link");
  const darkModeLink = document.getElementById("dark-mode-link")
  const darkModeIcon = document.getElementById('dark-mode-icon');
  const navbarBrandLogo = document.getElementById('navbar-brand-logo');

  navbarBrandLogo.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("home-content").style.display = "block";
    document.getElementById("models-content").style.display = "none";
    document.getElementById("media-content").style.display = "none";
  });

  homeLink.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("home-content").style.display = "block";
    document.getElementById("models-content").style.display = "none";
    document.getElementById("media-content").style.display = "none";
  });

  darkModeLink.addEventListener("click", (event) => {
    console.log("dark mode pressed");
    event.preventDefault();

    let isDarkMode = document.body.classList.toggle('dark-mode');

    if (isDarkMode) {
        console.log("adding dark");
        darkModeIcon.classList.remove('bi-sun');
        darkModeIcon.classList.add('bi-moon');
    } else {
        console.log("removing dark");
        darkModeIcon.classList.remove('bi-moon');
        darkModeIcon.classList.add('bi-sun');
      }
    });

  modelsLink.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("home-content").style.display = "none";
    document.getElementById("media-content").style.display = "none";
    $("#models-content").load("../app/views/home/models.php", function() {
      document.getElementById("models-content").style.display = "block";
        currentModel = createCoke('model-container-1');
        modelCreated = true;
        var imagesData;
        $.ajax({
          url: 'get_gallery_images.php',
          method: 'GET',
          success: function (images) {
            imagesData = images;
            var imageTrack = $('#image-track');
            images.forEach(function (image, index) {
              var carouselImage = $('<div>').addClass('carousel-image');
              var img = $('<img>')
                .attr('src', 'assets/images/gallery_images/' + image.file_name)
                .attr('alt', image.title)
                .addClass('image')
                .attr('draggable', 'false');
              var description = $('<h3>').text(image.description);
              var renderEngine = $('<h4>').text(image.title);
              carouselImage.append(img);
              carouselImage.append(description);
              carouselImage.append(renderEngine);
              imageTrack.append(carouselImage);
            });
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error fetching images:', textStatus, errorThrown);
          },
        });
            
        const track = document.getElementById("image-track");
        const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;
        const handleOnUp = () => {
          track.dataset.mouseDownAt = "0";  
          track.dataset.prevPercentage = track.dataset.percentage;
        }
        const handleOnMove = e => {
          if(track.dataset.mouseDownAt === "0") return;
          const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
                maxDelta = window.innerWidth / 2;
          const percentage = (mouseDelta / maxDelta) * -100,
                nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
                nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
          track.dataset.percentage = nextPercentage;
          track.animate({
            transform: `translate(${nextPercentage}%, -50%)`
          }, { duration: 1200, fill: "forwards" });
          for(const image of track.getElementsByClassName("image")) {
            image.animate({
              objectPosition: `${100 + nextPercentage}% center`
            }, { duration: 1200, fill: "forwards" });
          }
        }
            window.onmousedown = e => handleOnDown(e);
            window.ontouchstart = e => handleOnDown(e.touches[0]);
            window.onmouseup = e => handleOnUp(e);
            window.ontouchend = e => handleOnUp(e.touches[0]);
            window.onmousemove = e => handleOnMove(e);
            window.ontouchmove = e => handleOnMove(e.touches[0]);

        });
});

  mediaLink.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("home-content").style.display = "none";
    document.getElementById("models-content").style.display = "none";

    $("#media-content").load("media.php", function() {
      document.getElementById("media-content").style.display = "block";
      gsap.registerPlugin(ScrollTrigger);
      const images = gsap.utils.toArray("img");
      const loader = document.querySelector(".loader--text");
      const updateProgress = (instance) =>
        (loader.textContent = `${Math.round(
          (instance.progressedCount * 100) / images.length
        )}%`);
        const showDemo = () => {
          document.body.style.overflow = "auto";
          document.scrollingElement.scrollTo(0, 0);
          gsap.to(document.querySelector(".loader"), { autoAlpha: 0 });
          gsap.utils.toArray("section").forEach((section, index) => {
            const w = section.querySelector(".wrapper");
            if (w) { 
              const [x, xEnd] = index % 2
                ? ["100%", (w.scrollWidth - section.offsetWidth) * -1]
                : [w.scrollWidth * -1, 0];
              gsap.fromTo(
                w,
                { x },
                {
                  x: xEnd,
                  scrollTrigger: {
                    trigger: section,
                    scrub: 0.5,
                  },
                }
              );
            }
          });
        };
      imagesLoaded(images).on("progress", updateProgress).on("always", showDemo);
    });
  });  

  $(document).on("click", "#model-list li", function (event) {
    event.preventDefault();
    const selectedOption = $(this).attr("id");
    $("#model-container-1").empty();
    $('#spin-model-x-btn').text('ROTATE X')
    $('#spin-model-y-btn').text('ROTATE Y')
    $('#spin-model-z-btn').text('ROTATE Z')
    $("#view-select").val("");
    $("#coke-select").val("");
    $("#sprite-select").val("");
  
    if (selectedOption === "coke-can") {
      $("#coke-select").prop("disabled", false);
    } else {
      $("#coke-select").prop("disabled", true);
    }
  
    if (selectedOption === "sprite-bottle") {
      $("#sprite-select").prop("disabled", false);
    } else {
      $("#sprite-select").prop("disabled", true);
    }
  
    if (currentModel && currentModel.spin) {
      currentModel.stopButtonText = true;
    }
  
    switch (selectedOption) {
      case "costa-cup":
        currentModel = createCoffee("model-container-1");
        break;
      case "coke-can":
        currentModel = createCoke("model-container-1");
        break;
      case "sprite-bottle":
        currentModel = createSprite("model-container-1");
        break;
      default:
        break;
    }
  });
  
  $(document).on("click", "#spin-model-x-btn", function (event) {
    event.preventDefault();
    if (currentModel) {
      if (currentModel.spin === 'x') {
        currentModel.stopSpin();
        $(this).text("Rotate X");
      } else {
        currentModel.spinX();
        $(this).text("Stop Rotating");
        $("#spin-model-z-btn").text("Rotate Z");
        $("#spin-model-y-btn").text("Rotate Y");
        $("#view-select").val("");
      }
    }
  });

  $(document).on("click", "#spin-model-y-btn", function (event) {
    event.preventDefault();
    if (currentModel) {
      if (currentModel.spin === 'y') {
        currentModel.stopSpin();
        $(this).text("Rotate Y");
      } else {
        currentModel.spinY();
        $(this).text("Stop Rotating");
        $("#spin-model-z-btn").text("Rotate Z");
        $("#spin-model-x-btn").text("Rotate X");
        $("#view-select").val("");
      }
    }
  });

  $(document).on("click", "#spin-model-z-btn", function (event) {
    event.preventDefault();
    if (currentModel) {
      if (currentModel.spin === 'both') {
        currentModel.stopSpin();
        $(this).text("Rotate Z");
      } else {
        currentModel.spinBoth();
        $(this).text("Stop Rotating");
        $("#spin-model-x-btn").text("Rotate X");
        $("#spin-model-y-btn").text("Rotate Y");
        $("#view-select").val("");
      }
    }
  });


  $(document).on("click", "#view-list li", function (event) {
    event.preventDefault();
    if (currentModel) {
        const selectedView = $(this).attr("id");

        $('#spin-model-x-btn').text('ROTATE X')
        $('#spin-model-y-btn').text('ROTATE Y')
        $('#spin-model-z-btn').text('ROTATE Z')

        if (currentModel.spin) {
            currentModel.spin = false;
            $("#spin-model-btn").text("Spin Model");
        }

        switch(selectedView) {
            case 'front-view':
                currentModel.frontView();
                break;
            case 'side-view':
                currentModel.sideView();
                break;
            case 'back-view':
                currentModel.backView();
                break;
            case 'top-view':
                currentModel.topView();
                break;
            case 'bottom-view':
                currentModel.bottomView();
                break;
            default:

                break;
        }
      }
  });



  $(document).on("click", "#wireframe-toggle", function (event) {
    event.preventDefault();
    if (currentModel) {
    currentModel.wireframe = !currentModel.wireframe;
      }
    });


  
    $(document).on('click', '#contact-link', function(e) {
        e.preventDefault();
        $('#contactModal').modal('show'); 
    });

    const aboutLink = document.getElementById("about-link");
    const aboutPopover = document.getElementById("about-popover");
    $(document).on('click', '#about-link', function(e) {
        e.preventDefault(); 
        if (aboutPopover.style.display === "none") {
          const linkRect = aboutLink.getBoundingClientRect();
          const linkTop = linkRect.top;
          const linkLeft = linkRect.left;
          aboutPopover.style.position = "absolute";
          aboutPopover.style.top = linkTop + linkRect.height + "px";
          aboutPopover.style.left = linkLeft + "px";
          
          aboutPopover.style.display = "block";
          } else {
          aboutPopover.style.display = "none";
          }
          });

  $(".nav-link").hover(
    function () {
      $(this).find("i").addClass("shake");
    },
    function () {
      $(this).find("i").removeClass("shake");
    }
  );

});


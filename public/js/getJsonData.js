$(document).ready(function () {
  $.ajax({
    url: "get_json_data.php",
    method: "GET",
    success: function (data) {
      data.cards.forEach(function (card) {

        var cardHTML = `
            <div class="col-md h-100">
             <div class="card bg-dark text-light custom-bg-${card.id}">
              <div class="card-body text-centre">
                <div class="h1 mb-3">
                  <img src="${card.imageSrc}" class="img-fluid" alt="">
                </div>
                <h3 class="card-title">${card.title}</h3>
                <h5>${card.subtitle}</h5>
                <p class="card-text">${card.text}</p>
                <a href="${card.btnUrl}" class="btn btn-card-${card.id}">${card.btnText}</a>
              </div>
            </div>
          </div>`;
        $("#cards-section").append(cardHTML);
      });

      var learnHTML = `
      <div class="container px-5">
                    <div class="row gx-5 justify-content-center">
                        <div class="col-xxl-8">
                            <div class="text-center my-5">
                                <h2 class="display-5 fw-bolder"><span class="text-gradient d-inline">${data.learnSection.title}</span></h2>
                                <p class="text-muted">${data.learnSection.text}</p>
                                <div class="d-flex justify-content-center align-items-center fs-2">
                                  <a href="${data.learnSection.btnUrl}" class="btn custom-read-btn">
                                  <i class="bi bi-chevron-right"></i>${data.learnSection.btnText}
                                  </a>
                                </div>
                                <div class="d-flex justify-content-center fs-2 gap-4">
                                    <a class="text-gradient" href="https://twitter.com/CocaCola"><i class="bi bi-twitter"></i></a>
                                    <a class="text-gradient" href="#!"><i class="bi bi-linkedin"></i></a>
                                    <a class="text-gradient" href="#!"><i class="bi bi-github"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
      $("#learn-section").append(learnHTML);

      var galleryTextHTML = `
      <h1>${data.gallerySection.howToTitle}</h1>
      <p style="margin: 0 100px;">${data.gallerySection.howToText}</p>`;
      $(".text-section").append(galleryTextHTML);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error fetching data:", errorThrown, jqXHR, textStatus);
    },
    
  });
});

<!-- Project Card 1-->
<div class="card text-center overflow-hidden shadow rounded-4 border-0 mb-5 mt-5 custom-wide-card">
    <div class="card-body p-0 h-100">
        <div class="card-inner align-items-center">

            <div class="p-4">
                <h2 class="fw-bolder card-titles">3D Model Controls</h2>
            </div>

            <div class="container">
                <div class="row">
                     
                <!-- First column: Buttons -->
                     <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="row d-flex justify-content-center h-100">

                            <!-- First card: Choose Model -->
                            <div class="col-12 mb-3">
                                <div class="card p-3 stacker h-100 models-stack">
                                    <h1 style="color: red">Choose Model</h1>
                                    <br>
                                    <br>
                                    <ul id="model-list">
                                        <li id="coke-can" style="--i:3;"><a href="#">Coke Can</a></li>
                                        <li id="costa-cup" style="--i:2;"><a href="#">Costa Cup</a></li>
                                        <li id="sprite-bottle" style="--i:1;"><a href="#">Sprite Bottle</a></li>
                                    </ul>

                                    <br>
                                    <br>
                                    <h1 style="color: #b49f00">Toggle Wireframe</h1>
                                    <br>
                                    <br>
                                    <ul id="wireframe-list">
                                        <li id="wireframe-toggle" style="--i:3;"><a href="#">Toggle</a></li>
                                    </ul>
                                    <br>
                                    <br>
                                    <h1 style="color: #e44b8d">Animation</h1>
                                    <br>
                                    <br>
                                    <ul id="rotate-list">
                                        <li id="spin-model-x-btn" style="--i:3;"><a href="#">Rotate X</a></li>
                                        <li id="spin-model-y-btn" style="--i:2;"><a href="#">Rotate Y</a></li>
                                        <li id="spin-model-z-btn" style="--i:1;"><a href="#">Rotate Z</a></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Middle column: Model Container -->
                    <div class="col-lg-6 col-md-8 col-sm-12 three-models">
                        <div class="p-10">
                            <div id="model-container-1" class="img-fluid" style="width: 70vw; height: 70vh;"></div>
                        </div>
                    </div>

                    <!-- Right column: Buttons -->
                    <div class="col-lg-3 col-md-12 col-sm-6">
                        <div class="row d-flex justify-content-center h-100">

                            <div class="col-12 mb-3">
                                <div class="card p-3 stacker h-100 textures">
                                    <h1 style="color: #29ab87;">Change Textures</h1>
                                    <br>
                                    <br>
                                    <ul id="texture-list">
                                        <li id="coke" style="--i:3;"><a href="#">Coke (Can)</a></li>
                                        <li id="fanta" style="--i:2;"><a href="#">Fanta (Can)</a></li>
                                        <li id="drpepper" style="--i:1;"><a href="#">Dr Pepper (Can)</a></li>
                                    </ul>
                                    <br>
                                        <br>
                                    <ul id="texture-list">
                                        <li id="sprite" style="--i:3;"><a href="#">Sprite (Bottle)</a></li>
                                        <li id="spritezero" style="--i:2;"><a href="#">Sprite Zero (Bottle)</a></li>
                                        
                                    </ul>
                                    <br>
                                    <br>
                                    <h1 style="color: #3c1f74">Change View</h1>
                                    <br>
                                    <br>
                                    <ul id="view-list">
                                        <li id="front-view" style="--i:5;"><a href="#">Front View</a></li>
                                        <li id="side-view" style="--i:4;"><a href="#">Side View</a></li>
                                        <li id="back-view" style="--i:3;"><a href="#">Back View</a></li>
                                        <li id="top-view" style="--i:2;"><a href="#">Top View</a></li>
                                        <li id="bottom-view" style="--i:1;"><a href="#">Bottom View</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div>
</section>

<!-- Project Card 2-->
<div class="card text-center overflow-hidden shadow rounded-4 mb-5 border-0 custom-wide-card">
                    <div class="card-body p-0" style="user-select: none;">
                        <div class="align-items-center">
                            <div class="p-5">
                                <h2 class="card-titles">3D Image Gallery</h2>
                                <h5 class="card-titles" style="margin-bottom: 200px;">click and swipe to reveal...</h5>

                                <div class="carousel-body">
                                    <div id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <!-- Call to action section-->
<section class="py-5 bg-gradient-primary-to-secondary text-white">
    <div class="container px-5 my-5">
        <div class="text-center models-footer">
            <img style="" src="assets/images/footer-models.png">
        </div>
    </div>
</section>

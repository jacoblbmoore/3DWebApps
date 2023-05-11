<?php

require_once '../app/controllers/HomeController.php';
require_once '../app/controllers/DataController.php';

$controller = new HomeController();
$controller->index();


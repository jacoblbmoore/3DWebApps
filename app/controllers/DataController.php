<?php
require_once '../app/models/CardModel.php';
require_once '../app/models/LearnSectionModel.php';
require_once '../app/models/GallerySectionModel.php';
require_once '../app/models/GalleryImagesModel.php';

class DataController {
    public function getJsonData() {
        
        $cardModel = new CardModel();
        $learnSectionModel = new LearnSectionModel();
        $gallerySectionModel = new GallerySectionModel();
        
        $cards = $cardModel->getAllCards();
        $learnSection = $learnSectionModel->getLearnSection();
        $gallerySection = $gallerySectionModel->getGallerySection();

        
        $data = [
            'cards' => $cards,
            'learnSection' => $learnSection,
            'gallerySection' => $gallerySection
        ];

        
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    public function getGalleryImages() {
        
        $galleryImagesModel = new GalleryImagesModel();
        $images = $galleryImagesModel->getAllImages();

        
        header('Content-Type: application/json');
        echo json_encode($images);
    }
}

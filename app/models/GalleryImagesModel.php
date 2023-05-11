<?php

class GalleryImagesModel {
    public function getAllImages() {
        $db = new SQLite3('../database/3dapp_database.db');
        $result = $db->query("SELECT * FROM gallery_images");
        $images = [];
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $images[] = $row;
        }
        return $images;
    }
    
}

<?php
class GallerySectionModel {
    public function getGallerySection() {
        $db = new SQLite3('../database/3dapp_database.db');
        $result = $db->query("SELECT * FROM gallery_section LIMIT 1");
        return $result->fetchArray(SQLITE3_ASSOC);
    }
}

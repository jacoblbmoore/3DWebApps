<?php
class CardModel {
    public function getAllCards() {
        $db = new SQLite3('../database/3dapp_database.db');
        $result = $db->query("SELECT * FROM cards");
        $cards = [];
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $cards[] = $row;
        }
        return $cards;
    }
}

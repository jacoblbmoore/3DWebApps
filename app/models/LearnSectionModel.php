<?php
class LearnSectionModel {
    public function getLearnSection() {
        $db = new SQLite3('../database/3dapp_database.db');
        $result = $db->query("SELECT * FROM learn_section LIMIT 1");
        return $result->fetchArray(SQLITE3_ASSOC);
    }
}

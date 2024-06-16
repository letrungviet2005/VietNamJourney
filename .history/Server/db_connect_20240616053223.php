<?php
function dbConnect()
{
    $servername = 'sql12.freesqldatabase.com';
    $username = 'sql12714051';
    $password = 'X5N7Kae1as';
    $database = 'sql12714051';

    // Kết nối đến cơ sở dữ liệu
    $conn = new mysqli($servername, $username, $password, $database);

    // Kiểm tra kết nối
    if ($conn->connect_error) {
        return false;
    }
    return $conn;
}

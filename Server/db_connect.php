<?php
function dbConnect()
{
    $servername = 'localhost';
    $username = 'root';
    $password = '';
    $database = 'test';

    // Kết nối đến cơ sở dữ liệu
    $conn = new mysqli($servername, $username, $password, $database);

    // Kiểm tra kết nối
    if ($conn->connect_error) {
        return false;
    }
    return $conn;
}

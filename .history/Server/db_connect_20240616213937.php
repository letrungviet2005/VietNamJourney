<?php
function dbConnect()
{
    $servername = 'sql12.freesqldatabase.com';
    $username = 'root';
    $password = '';
    $database = 'testphp';

    // Kết nối đến cơ sở dữ liệu
    $conn = new mysqli($servername, $username, $password, $database);

    // Kiểm tra kết nối
    if ($conn->connect_error) {
        return false;
    }
    return $conn;
}

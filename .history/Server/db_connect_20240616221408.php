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
        die("Kết nối đến cơ sở dữ liệu thất bại: " . $conn->connect_error);
    }
    return $conn;
}

// Hàm kiểm tra kết nối đến database
function testDbConnection()
{
    $conn = dbConnect();
    if ($conn) {
        echo "Kết nối đến cơ sở dữ liệu thành công.";
        $conn->close();
    } else {
        echo "Kết nối đến cơ sở dữ liệu thất bại.";
    }
}

testDbConnection();
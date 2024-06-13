<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Xử lý yêu cầu preflight
    header("HTTP/1.1 200 OK");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Đọc dữ liệu JSON từ yêu cầu POST
    $data = json_decode(file_get_contents("php://input"), true);

    // Xử lý dữ liệu và tạo phản hồi
    $response = array(
        "message" => "Dữ liệu nhận được đây nè",
        "receivedData" => $data
    );

    // Trả về dữ liệu JSON
    echo json_encode($response);
} else {
    echo "Method not allowed";
}
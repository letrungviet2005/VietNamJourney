<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Xử lý yêu cầu preflight
    header("HTTP/1.1 200 OK");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Đọc dữ liệu JSON từ yêu cầu POST
    $data = json_decode(file_get_contents("php://input"), true);

    $conn = dbConnect();

    if (!$conn) {
        $response = array("error" => "Kết nối đến cơ sở dữ liệu thất bại");
    } else {
        $sql = "SELECT * FROM userlogin";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $users = array();

            while ($row = $result->fetch_assoc()) {
                $user = array(
                    "id" => $row["userlogin_id"],
                    "username" => $row["user"],
                    "password" => $row["password"],
                    "test" => $row["test"]
                );
                $users[] = $user;
            }

            $response = array(
                "message" => "Dữ liệu người dùng nhận được từ cơ sở dữ liệu",
                "users" => $users
            );
        } else {
            $response = array("message" => "Không có người dùng nào được tìm thấy");
        }

        // Đóng kết nối
        $conn->close();
    }

    echo json_encode($response);
} else {
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(array("error" => "Method not allowed"));
}

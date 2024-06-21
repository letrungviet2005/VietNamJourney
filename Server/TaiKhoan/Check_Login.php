<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Xử lý yêu cầu preflight
    header("HTTP/1.1 200 OK");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $username = isset($data['username']) ? $data['username'] : null;
    $password = isset($data['password']) ? $data['password'] : null;

    $conn = dbConnect();

    if (!$conn) {
        $response = array("error" => "Kết nối đến cơ sở dữ liệu thất bại");
    } else {
        if ($username && $password) {
            // Kiểm tra thông tin đăng nhập
            $sql = "SELECT UserLogin_ID, Username, Password FROM userlogin WHERE Username = ? AND Password = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ss", $username, $password);
            $stmt->execute();
            $result = $stmt->get_result();
            $user = $result->fetch_assoc();

            if ($user) {
                // Thiết lập cookie User_ID
                setcookie("User_ID", $user['UserLogin_ID'], time() + (86400 * 30), "/");
                $response = array("success" => "Đăng nhập thành công", "user" => $user);
            } else {
                $response = array("error" => "Email hoặc mật khẩu sai !");
            }
        } else {
            $response = array("error" => "Username và Password không hợp lệ");
        }

        // Đóng kết nối
        $conn->close();
    }

    echo json_encode($response);
} else {
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(array("error" => "Method not allowed"));
}

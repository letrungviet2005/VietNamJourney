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
    $id = isset($data['id']) ? $data['id'] : null;

    $conn = dbConnect();

    if (!$conn) {
        $response = array("error" => "Kết nối đến cơ sở dữ liệu thất bại");
    } else {
        if ($userId) {
            // Lấy thông tin người dùng
            $sqlUser = "SELECT u.*, 
            (SELECT COUNT(*) FROM follow WHERE Following_ID = u.User_ID) AS followers, 
            (SELECT COUNT(*) FROM follow WHERE Follower_ID = u.User_ID) AS following, 
            l.Link AS facebookLink
            FROM user_information u
            LEFT JOIN link l ON u.User_ID = l.User_ID AND l.Social = 'Facebook'
            WHERE u.User_ID = ?";
            $stmtUser = $conn->prepare($sqlUser);
            $stmtUser->bind_param("i", $userId);
            $stmtUser->execute();
            $resultUser = $stmtUser->get_result();
            $user = $resultUser->fetch_assoc();

            if ($user) {
                $imageData = base64_encode($user['Image']);
                $response = array(
                    "user" => array(
                        "avatar" => 'data:image/jpeg;base64,' . $imageData,
                        "name" => $user['Name'],
                        "username" => $user['Username'],
                        "followers" => $user['followers'],
                        "following" => $user['following'],
                        "role" => $user['Role'],
                        "location" => $user['LiveAt'],
                        "facebookLink" => $user['facebookLink']
                    )
                );
            } else {
                $response = array("error" => "Không tìm thấy người dùng");
            }
        } else {
            $response = array("error" => "User ID không hợp lệ");
        }

        // Đóng kết nối
        $conn->close();
    }

    echo json_encode($response);
} else {
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(array("error" => "Method not allowed"));
}
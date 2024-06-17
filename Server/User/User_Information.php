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
    $userId = isset($data['userId']) ? $data['userId'] : null;

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
                $response = array(
                    "user" => array(
                        "avatar" => $user['Image'],
                        "name" => $user['Name'],
                        "username" => $user['Username'],
                        "followers" => $user['followers'],
                        "following" => $user['following'],
                        "role" => $user['Gender'],
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

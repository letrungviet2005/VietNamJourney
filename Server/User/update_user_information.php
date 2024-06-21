<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $userId = $data['userId'];
    $name = $data['name'];
    $location = $data['location'];
    $facebookLink = $data['facebookLink'];
    $role = $data['role'];
    $avatar = $data['avatar'];

    // Kiểm tra và xử lý dữ liệu avatar base64
    if ($avatar) {
        // Tách phần data và phần base64
        list($type, $avatar) = explode(';', $avatar);
        list(, $avatar) = explode(',', $avatar);

        // Giải mã dữ liệu base64
        $avatar = base64_decode($avatar);

        if ($avatar === false) {
            echo json_encode(['success' => false, 'error' => 'Dữ liệu ảnh không hợp lệ']);
            exit();
        }
    } else {
        $avatar = null; // Nếu không có dữ liệu avatar mới, giữ nguyên ảnh cũ
    }

    $conn = dbConnect();

    if (!$conn) {
        echo json_encode(['success' => false, 'error' => 'Kết nối đến cơ sở dữ liệu thất bại']);
        exit();
    }

    // Cập nhật dữ liệu người dùng
    $query = "UPDATE user_information SET Name = ?, LiveAt = ?, Role = ?, Image = ? WHERE UserLogin_ID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssssi", $name, $location, $role, $avatar, $userId);

    if ($stmt->execute()) {
        // Cập nhật liên kết Facebook
        $queryLink = "REPLACE INTO link (User_ID, Social, Link) VALUES (?, 'Facebook', ?)";
        $stmtLink = $conn->prepare($queryLink);
        $stmtLink->bind_param("is", $userId, $facebookLink);
        $stmtLink->execute();

        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}

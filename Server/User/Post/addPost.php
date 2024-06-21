<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require '../../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

$conn = dbConnect();

// Đặt múi giờ mặc định là Asia/Ho_Chi_Minh
date_default_timezone_set('Asia/Ho_Chi_Minh');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = $_POST['User_ID'];
    $content = $_POST['Content'];
    $image = null;

    if (isset($_POST['Image'])) {
        $image = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $_POST['Image']));
    }

    $created_at = date('Y-m-d H:i:s');

    $query = "INSERT INTO post (User_ID, Content, Image, CreateAt) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("isss", $user_id, $content, $image, $created_at);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}

<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $postId = isset($data['Post_ID']) ? $data['Post_ID'] : null;
    $userId = isset($data['user_id']) ? $data['user_id'] : null;
    $isLike = isset($data['isLike']) ? $data['isLike'] : null;

    if ($postId && $userId !== null && $isLike !== null) {
        $conn = dbConnect();

        if ($conn) {
            if ($isLike) {
                $sql = "INSERT INTO islike (Post_ID, User_ID) VALUES (?, ?)";
            } else {
                $sql = "DELETE FROM islike WHERE Post_ID = ? AND User_ID = ?";
            }
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ii", $postId, $userId);
            if ($stmt->execute()) {
                echo json_encode(["success" => true]);
            } else {
                echo json_encode(["success" => false, "error" => $stmt->error]);
            }

            $stmt->close();
            $conn->close();
        } else {
            echo json_encode(["error" => "Database connection failed"]);
        }
    } else {
        echo json_encode(["error" => "Invalid parameters"]);
    }
} else {
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(["error" => "Method not allowed"]);
}

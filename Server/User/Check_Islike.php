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

    if ($postId && $userId) {
        $conn = dbConnect();

        if ($conn) {
            $sql = "SELECT 1 FROM islike WHERE Post_ID = ? AND User_ID = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ii", $postId, $userId);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                echo json_encode(["isLiked" => true]);
            } else {
                echo json_encode(["isLiked" => false]);
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

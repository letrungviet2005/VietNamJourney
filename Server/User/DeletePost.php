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

    if ($postId) {
        $conn = dbConnect();

        if ($conn) {
            // Xóa bình luận liên quan đến bài viết
            $sql = "DELETE FROM comment WHERE Post_ID = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $postId);
            $stmt->execute();
            $stmt->close();

            // Xóa lượt thích liên quan đến bài viết
            $sql = "DELETE FROM islike WHERE Post_ID = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $postId);
            $stmt->execute();
            $stmt->close();

            // Xóa bài viết
            $sql = "DELETE FROM post WHERE Post_ID = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $postId);
            $stmt->execute();
            $stmt->close();

            $conn->close();

            echo json_encode(["success" => true]);
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

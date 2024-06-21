<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}
$conn = dbConnect();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $User_ID = isset($input['User_ID']) ? (int)$input['User_ID'] : null;
    $Followed_User_ID = isset($input['Followed_User_ID']) ? (int)$input['Followed_User_ID'] : null;
    $Status = isset($input['Status']) ? $input['Status'] : null;

    if (!$User_ID || !$Followed_User_ID || !$Status) {
        echo json_encode(['success' => false, 'error' => 'Missing parameters']);
        exit();
    }

    if ($Status === 'follow') {
        // Thêm vào bảng follow
        $query = "INSERT INTO follow (Follower_ID, Following_ID) VALUES (?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ii", $User_ID, $Followed_User_ID);
    } elseif ($Status === 'unfollow') {
        // Xóa khỏi bảng follow
        $query = "DELETE FROM follow WHERE Follower_ID = ? AND Following_ID = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ii", $User_ID, $Followed_User_ID);
    } else {
        echo json_encode(['success' => false, 'error' => 'Invalid status']);
        exit();
    }

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}

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
    $userId = isset($data['User_ID']) ? $data['User_ID'] : null;

    if ($userId) {
        $conn = dbConnect();

        if (!$conn) {
            $response = array("error" => "Failed to connect to the database");
            http_response_code(500);
            echo json_encode($response);
            exit();
        }

        $sql = "SELECT following_ID FROM follow WHERE Follower_Id != ? AND Following_Id != ? LIMIT 5";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $userId, $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        $followers = $result->fetch_all(MYSQLI_ASSOC);

        if ($followers && count($followers) > 0) {
            $followingIds = array_column($followers, 'following_ID');
            $placeholders = implode(',', array_fill(0, count($followingIds), '?'));

            $sql = "SELECT User_ID, Username, Image FROM user_information WHERE User_ID IN ($placeholders)";
            $stmt = $conn->prepare($sql);

            // Use call_user_func_array to bind params
            $types = str_repeat('i', count($followingIds));
            $stmt->bind_param($types, ...$followingIds);
            $stmt->execute();
            $result = $stmt->get_result();
            $users = $result->fetch_all(MYSQLI_ASSOC);

            $formattedUsers = array();
            foreach ($users as $user) {
                $formattedUsers[] = array(
                    "User_ID" => $user['User_ID'],
                    "Username" => $user['Username'],
                    "Image" => base64_encode($user['Image']),
                );
            }

            $response = array("users" => $formattedUsers);
        } else {
            $response = array("users" => []);
        }

        $conn->close();
        echo json_encode($response);
        exit();
    } else {
        $response = array("error" => "Invalid User ID");
        http_response_code(400); // Bad Request
        echo json_encode($response);
        exit();
    }
} else {
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(array("error" => "Method not allowed"));
    exit();
}

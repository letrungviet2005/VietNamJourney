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


        $sql = "SELECT following_id FROM follow WHERE follower_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        $followingIds = $result->fetch_all(MYSQLI_ASSOC);


        $followingIdsArray = array_column($followingIds, 'following_id');


        if (count($followingIdsArray) > 0) {
            $placeholders = implode(',', array_fill(0, count($followingIdsArray), '?'));


            $sql = "SELECT DISTINCT following_id 
                    FROM follow 
                    WHERE following_id NOT IN ($placeholders) 
                    AND following_id != ? 
                    LIMIT 5";

            $stmt = $conn->prepare($sql);


            $types = str_repeat('i', count($followingIdsArray)) . 'i';
            $params = array_merge($followingIdsArray, array($userId));

            // Bind parameters
            $stmt->bind_param($types, ...$params);
            $stmt->execute();
            $result = $stmt->get_result();
            $unfollowedIds = $result->fetch_all(MYSQLI_ASSOC);


            $unfollowedIdsArray = array_column($unfollowedIds, 'following_id');

            if (count($unfollowedIdsArray) > 0) {
                $placeholders = implode(',', array_fill(0, count($unfollowedIdsArray), '?'));

                // Get user information for these unfollowed ids
                $sql = "SELECT User_ID, Username, Image FROM user_information WHERE User_ID IN ($placeholders)";
                $stmt = $conn->prepare($sql);

                // Bind parameters
                $types = str_repeat('i', count($unfollowedIdsArray));
                $stmt->bind_param($types, ...$unfollowedIdsArray);
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
        } else {

            $sql = "SELECT User_ID, Username, Image FROM user_information WHERE User_ID != ? LIMIT 5";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $userId);
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

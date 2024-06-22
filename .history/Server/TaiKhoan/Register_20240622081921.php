<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");
require '../db_connect.php';
$imagePath = "../../src/Images/Icons/clone.jpg";

// Function to read and encode image to base64
function base64_encode_image($imagePath)
{
    $imageData = file_get_contents($imagePath);
    return base64_encode($imageData);
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Handle preflight CORS request
    header("HTTP/1.1 200 OK");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Read JSON data from POST request
    $data = json_decode(file_get_contents("php://input"), true);

    // Check if JSON data is invalid
    if (!$data) {
        http_response_code(400);
        echo json_encode(array("error" => "Dữ liệu không hợp lệ"));
        exit();
    }

    // Check for required fields
    $requiredFields = ['email', 'username', 'password'];

    foreach ($requiredFields as $field) {
        if (!isset($data[$field])) {
            http_response_code(400);
            echo json_encode(array("error" => "Thiếu tham số bắt buộc: $field"));
            exit();
        }
    }

    $email = htmlspecialchars(strip_tags($data['email']));
    $username = htmlspecialchars(strip_tags($data['username']));
    $password = htmlspecialchars(strip_tags($data['password']));
    $base64Image = base64_encode_image($imagePath);

    // Connect to the database
    $conn = dbConnect();
    if (!$conn) {
        http_response_code(500);
        echo json_encode(array("error" => "Kết nối đến cơ sở dữ liệu thất bại"));
        exit();
    }

    // Check if username already exists
    $query = $conn->prepare("SELECT * FROM userlogin WHERE Username = ?");
    $query->bind_param("s", $username);
    $query->execute();
    $result = $query->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(['error' => 'username đã được sử dụng']);
        exit;
    }

    // Insert data into userlogin table
    $query = $conn->prepare("INSERT INTO userlogin (Username, Password) VALUES (?, ?)");
    $query->bind_param("ss", $username, $password);
    if ($query->execute()) {
        // Get UserLogin_ID based on the inserted username and password
        $query = $conn->prepare("SELECT UserLogin_ID FROM userlogin WHERE Username = ? AND Password = ?");
        $query->bind_param("ss", $username, $password);
        $query->execute();
        $result = $query->get_result();
        $user = $result->fetch_assoc();

        if ($user) {
            $userID = $user['UserLogin_ID'];

            // Insert data into user_information table including the base64 encoded image
            $query = $conn->prepare("INSERT INTO user_information (UserLogin_ID, Username, Image) VALUES (?, ?, ?)");
            $null = NULL;
            $query->bind_param("iss", $userID, $username, $null); // Bind image as NULL initially
            $query->send_long_data(2, $base64Image); // Send image data as longBlob
            if ($query->execute()) {
                echo json_encode(['success' => true, 'user' => ['UserLogin_ID' => $userID, 'Username' => $username]]);
            } else {
                echo json_encode(['error' => 'Lỗi khi chèn dữ liệu vào bảng user_information']);
            }
        } else {
            echo json_encode(['error' => 'Không thể lấy UserLogin_ID']);
        }
    } else {
        echo json_encode(['error' => 'Lỗi khi chèn dữ liệu vào bảng userlogin']);
    }

    $query->close();
    $conn->close();
} else {
    http_response_code(405); // Method not allowed
    echo json_encode(array("error" => "Method not allowed"));
}

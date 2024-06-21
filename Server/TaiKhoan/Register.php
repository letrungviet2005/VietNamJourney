<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");
require '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Xử lý yêu cầu preflight của CORS
    header("HTTP/1.1 200 OK");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Đọc dữ liệu JSON từ yêu cầu POST
    $data = json_decode(file_get_contents("php://input"), true);

    // Kiểm tra nếu dữ liệu JSON không hợp lệ
    if (!$data) {
        http_response_code(400);
        echo json_encode(array("error" => "Dữ liệu không hợp lệ"));
        exit();
    }

    // Kiểm tra các tham số bắt buộc
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

    // Kết nối đến cơ sở dữ liệu
    $conn = dbConnect();
    if (!$conn) {
        http_response_code(500);
        echo json_encode(array("error" => "Kết nối đến cơ sở dữ liệu thất bại"));
        exit();
    }

    // Kiểm tra nếu username đã tồn tại
    $query = $conn->prepare("SELECT * FROM userlogin WHERE Username = ?");
    $query->bind_param("s", $username);
    $query->execute();
    $result = $query->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(['error' => 'username đã được sử dụng']);
        exit;
    }

    // Chèn dữ liệu vào bảng userlogin
    $query = $conn->prepare("INSERT INTO userlogin (Username, Password) VALUES (?, ?)");
    $query->bind_param("ss", $username, $password);
    if ($query->execute()) {
        // Lấy UserLogin_ID dựa trên username và password vừa chèn
        $query = $conn->prepare("SELECT UserLogin_ID FROM userlogin WHERE Username = ? AND Password = ?");
        $query->bind_param("ss", $username, $password);
        $query->execute();
        $result = $query->get_result();
        $user = $result->fetch_assoc();

        if ($user) {
            $userID = $user['UserLogin_ID'];

            // Chèn dữ liệu vào bảng user_information
            $query = $conn->prepare("INSERT INTO user_information (UserLogin_ID, Username) VALUES (?, ?)");
            $query->bind_param("is", $userID, $username);
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
    http_response_code(405); // Phương thức không được phép
    echo json_encode(array("error" => "Method not allowed"));
}

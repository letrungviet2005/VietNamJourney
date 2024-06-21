<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
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
    $requiredFields = ['userId', 'campaignId', 'status'];

    foreach ($requiredFields as $field) {
        if (!isset($data[$field])) {
            http_response_code(400);
            echo json_encode(array("error" => "Thiếu tham số bắt buộc: $field"));
            exit();
        }
    }

    // Lấy các tham số từ yêu cầu và làm sạch dữ liệu
    $userId = intval($data['userId']);
    $campaignId = intval($data['campaignId']);
    $status = intval($data['status']);

    // Kết nối đến cơ sở dữ liệu
    $conn = dbConnect();
    if (!$conn) {
        http_response_code(500);
        echo json_encode(array("error" => "Kết nối đến cơ sở dữ liệu thất bại"));
        exit();
    }

    // Câu lệnh SQL để thêm một tình nguyện viên vào chiến dịch
    $sql = "INSERT INTO volunteer (userId, campaignId, status) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(array("error" => "Không thể chuẩn bị câu lệnh SQL: " . $conn->error));
        exit();
    }

    // Ràng buộc các tham số với truy vấn
    $stmt->bind_param("iii", $userId, $campaignId, $status);

    // Thực thi câu lệnh
    if ($stmt->execute()) {
        http_response_code(201); // Tạo thành công
        echo json_encode(array("success" => "Đã thêm tình nguyện viên vào chiến dịch thành công"));
    } else {
        http_response_code(500);
        echo json_encode(array("error" => "Không thể thêm tình nguyện viên vào chiến dịch: " . $stmt->error));
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(405); // Phương thức không được phép
    echo json_encode(array("error" => "Method not allowed"));
}

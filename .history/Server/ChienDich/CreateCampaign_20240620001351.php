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
    $data = json_decode(file_get_contents("php://input"), true); // Đọc dữ liệu JSON từ yêu cầu POST

    // Kiểm tra các tham số cần thiết
    if (!isset($data['name']) || !isset($data['province']) || !isset($data['district']) || !isset($data['status']) || !isset($data['location']) || !isset($data['dateStart']) || !isset($data['dateEnd']) || !isset($data['totalMoney']) || !isset($data['description'])) {
        echo json_encode(array("error" => "Thiếu tham số bắt buộc"));
        exit();
    }

    // Lấy các tham số từ yêu cầu
    $name = $data['name'];
    $province = $data['province'];
    $district = $data['district'];
    $status = $data['status'];

    $conn = dbConnect();

    if (!$conn) {
        echo json_encode(array("error" => "Kết nối đến cơ sở dữ liệu thất bại"));
        exit();
    }

    $conn->set_charset("utf8mb4");

    // Câu lệnh SQL để thêm một chiến dịch mới
    $sql = "INSERT INTO campaign (name, province, district, status) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $name, $province, $district, $status); // Ràng buộc tham số với truy vấn

    if ($stmt->execute()) {
        echo json_encode(array("success" => "Thêm chiến dịch thành công"));
    } else {
        echo json_encode(array("error" => "Không thể thêm chiến dịch: " . $stmt->error));
    }

    $stmt->close();
    $conn->close();
} else {
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(array("error" => "Method not allowed"));
}

?>

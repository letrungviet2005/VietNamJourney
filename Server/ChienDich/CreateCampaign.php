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
    $requiredFields = ['name', 'province', 'district', 'location', 'dateStart', 'dateEnd', 'totalMoney', 'moneyByVNJN', 'timeline', 'infoContact', 'infoOrganization', 'image', 'description', 'status'];

    foreach ($requiredFields as $field) {
        if (!isset($data[$field])) {
            http_response_code(400);
            echo json_encode(array("error" => "Thiếu tham số bắt buộc: $field"));
            exit();
        }
    }

    // Lấy các tham số từ yêu cầu và làm sạch dữ liệu
    $id = $data['id'];
    $name = htmlspecialchars(strip_tags($data['name']));
    $province = htmlspecialchars(strip_tags($data['province']));
    $district = htmlspecialchars(strip_tags($data['district']));
    $location = htmlspecialchars(strip_tags($data['location']));
    $dateStart = htmlspecialchars(strip_tags($data['dateStart']));
    $dateEnd = htmlspecialchars(strip_tags($data['dateEnd']));
    $totalMoney = floatval($data['totalMoney']);
    $moneyByVNJN = floatval($data['moneyByVNJN']);
    $timeline = json_encode($data['timeline']);
    $infoContact = json_encode($data['infoContact']); // Lưu ý: Dữ liệu infoContact và infoOrganization đã được encode thành JSON
    $infoOrganization = json_encode($data['infoOrganization']);
    // $image = $data['image']; // Ảnh ở đây nên được xử lý riêng cho phần xử lý ảnh
    $description = htmlspecialchars(strip_tags($data['description']));
    $status = htmlspecialchars(strip_tags($data['status']));

    // Ảnh cần xử lý riêng vì đây là dữ liệu nhị phân
    $imageData = 'image';
    if (isset($data['image'])) {
        $imageData = base64_decode($data['image']);
        if (!$imageData) {
            http_response_code(400);
            echo json_encode(array("error" => "Dữ liệu ảnh không hợp lệ"));
            exit();
        }
    }

    // Kết nối đến cơ sở dữ liệu
    $conn = dbConnect();
    if (!$conn) {
        http_response_code(500);
        echo json_encode(array("error" => "Kết nối đến cơ sở dữ liệu thất bại"));
        exit();
    }

    // Câu lệnh SQL để thêm một chiến dịch mới
    $sql = "INSERT INTO campaign (userid, name, province, district, location, dateStart, dateEnd, totalMoney, moneyByVNJN, timeline, infoContact, infoOrganization, image, description, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(array("error" => "Không thể chuẩn bị câu lệnh SQL: " . $conn->error));
        exit();
    }

    // Ràng buộc các tham số với truy vấn
    $null = NULL;
    $stmt->bind_param("issssssiisssbsi", $id, $name, $province, $district, $location, $dateStart, $dateEnd, $totalMoney, $moneyByVNJN, $timeline, $infoContact, $infoOrganization, $null, $description, $status);
    $stmt->send_long_data(11, $imageData);
    // Thực thi câu lệnh
    if ($stmt->execute()) {
        http_response_code(201); // Tạo thành công
        echo json_encode(array("success" => "Thêm chiến dịch thành công"));
    } else {
        http_response_code(500);
        echo json_encode(array("error" => "Không thể thêm chiến dịch: " . $stmt->error));
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(405); // Phương thức không được phép
    echo json_encode(array("error" => "Method not allowed"));
}

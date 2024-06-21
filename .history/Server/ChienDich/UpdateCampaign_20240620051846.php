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

    // Kiểm tra nếu không có id
    if (!isset($data['id'])) {
        http_response_code(400);
        echo json_encode(array("error" => "Thiếu tham số bắt buộc: id"));
        exit();
    }

    // Lấy id của chiến dịch cần cập nhật
    $id = intval($data['id']);

    // Kiểm tra các tham số bắt buộc
    $requiredFields = ['name', 'province', 'district', 'location', 'dateStart', 'dateEnd', 'totalMoney', 'moneyByVNJN', 'timeline', 'infoContact', 'infoOrganization', 'description', 'status'];

    foreach ($requiredFields as $field) {
        if (!isset($data[$field])) {
            http_response_code(400);
            echo json_encode(array("error" => "Thiếu tham số bắt buộc: $field"));
            exit();
        }
    }

    // Lấy các tham số từ yêu cầu và làm sạch dữ liệu
    $name = htmlspecialchars(strip_tags($data['name']));
    $province = htmlspecialchars(strip_tags($data['province']));
    $district = htmlspecialchars(strip_tags($data['district']));
    $location = htmlspecialchars(strip_tags($data['location']));
    $dateStart = htmlspecialchars(strip_tags($data['dateStart']));
    $dateEnd = htmlspecialchars(strip_tags($data['dateEnd']));
    $totalMoney = floatval($data['totalMoney']);
    $moneyByVNJN = floatval($data['moneyByVNJN']);
    $timeline = json_encode($data['timeline']);
    $infoContact = json_encode($data['infoContact']);
    $infoOrganization = json_encode($data['infoOrganization']);
    $description = htmlspecialchars(strip_tags($data['description']));
    $status = htmlspecialchars(strip_tags($data['status']));

    // Xử lý ảnh từ base64 nếu có
    $imageData = null;
    if (isset($data['image']) && !empty($data['image'])) {
        $imageData = base64_decode($data['image']);
        if ($imageData === false) {
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

    // Câu lệnh SQL để cập nhật một chiến dịch
    if ($imageData !== null) {
        // Nếu có ảnh, cập nhật cả ảnh
        $sql = "UPDATE campaign SET name = ?, province = ?, district = ?, location = ?, dateStart = ?, dateEnd = ?, totalMoney = ?, moneyByVNJN = ?, timeline = ?, infoContact = ?, infoOrganization = ?, image = ?, description = ?, status = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            http_response_code(500);
            echo json_encode(array("error" => "Không thể chuẩn bị câu lệnh SQL: " . $conn->error));
            exit();
        }
        // Ràng buộc các tham số với truy vấn
        $null = NULL;
        $stmt->bind_param("ssssssddiisssii", $name, $province, $district, $location, $dateStart, $dateEnd, $totalMoney, $moneyByVNJN, $timeline, $infoContact, $infoOrganization, $null, $description, $status, $id);
        $stmt->send_long_data(11, $imageData); // Vị trí 11 là trường `image` trong câu lệnh SQL
    } else {
        // Nếu không có ảnh, chỉ cập nhật các trường khác
        $sql = "UPDATE campaign SET name = ?, province = ?, district = ?, location = ?, dateStart = ?, dateEnd = ?, totalMoney = ?, moneyByVNJN = ?, timeline = ?, infoContact = ?, infoOrganization = ?, description = ?, status = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            http_response_code(500);
            echo json_encode(array("error" => "Không thể chuẩn bị câu lệnh SQL: " . $conn->error));
            exit();
        }
        // Ràng buộc các tham số với truy vấn
        $stmt->bind_param("ssssssddiissii", $name, $province, $district, $location, $dateStart, $dateEnd, $totalMoney, $moneyByVNJN, $timeline, $infoContact, $infoOrganization, $description, $status, $id);
    }

    // Thực thi câu lệnh
    if ($stmt->execute()) {
        http_response_code(200); // Cập nhật thành công
        echo json_encode(array("success" => "Cập nhật chiến dịch thành công"));
    } else {
        http_response_code(500);
        echo json_encode(array("error" => "Không thể cập nhật chiến dịch: " . $stmt->error));
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(405); // Phương thức không được phép
    echo json_encode(array("error" => "Method not allowed"));
}
?>
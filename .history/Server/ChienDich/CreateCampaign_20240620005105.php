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
    // if (!isset($data['name']) || !isset($data['province']) || !isset($data['district']) || !isset($data['location']) || !isset($data['dateStart']) || !isset($data['dateEnd']) || !isset($data['totalMoney']) || !isset($data['moneyByVNJN']) || !isset($data['target']) || !isset($data['timeline']) || !isset($data['infoContact']) || !isset($data['infoOrganization']) || !isset($data['image']) || !isset($data['description']) || !isset($data['status'])) {
    //     echo json_encode(array("error" => "Thiếu tham số bắt buộc"));
    //     exit();
    // }

    $requiredFields = ['name', 'province', 'district', 'location', 'dateStart', 'dateEnd', 'totalMoney', 'moneyByVNJN', 'timeline', 'infoContact', 'infoOrganization', 'image', 'description', 'status'];

    foreach ($requiredFields as $field) {
        if (!isset($data[$field])) {
            echo json_encode(array("error" => "Thiếu tham số bắt buộc: $field"));
            exit();
        }
    }

    // // Lấy các tham số từ yêu cầu
    // $name = $data['name'];
    // $province = $data['province'];
    // $district = $data['district'];
    // $location = $data['location'];
    // $dateStart = $data['dateStart'];
    // $dateEnd = $data['dateEnd'];
    // $totalMoney = $data['totalMoney'];
    // $moneyByVNJN = $data['moneyByVNJN'];
    // $target = $data['target'];
    // $timeline = $data['timeline'];
    // $infoContact = $data['infoContact'];
    // $infoOrganization = $data['infoOrganization'];
    // $image = $data['image'];
    // $description = $data['description'];
    // $status = $data['status'];

     // Lấy các tham số từ yêu cầu và làm sạch dữ liệu
     $name = htmlspecialchars(strip_tags($data['name']));
     $province = htmlspecialchars(strip_tags($data['province']));
     $district = htmlspecialchars(strip_tags($data['district']));
     $location = htmlspecialchars(strip_tags($data['location']));
     $dateStart = htmlspecialchars(strip_tags($data['dateStart']));
     $dateEnd = htmlspecialchars(strip_tags($data['dateEnd']));
     $totalMoney = floatval($data['totalMoney']);
     $moneyByVNJN = floatval($data['moneyByVNJN']);
    //  $target = htmlspecialchars(strip_tags($data['target']));
     $timeline = htmlspecialchars(strip_tags($data['timeline']));
     $infoContact = htmlspecialchars(strip_tags($data['infoContact']));
     $infoOrganization = htmlspecialchars(strip_tags($data['infoOrganization']));
     $image = htmlspecialchars(strip_tags($data['image']));
     $description = htmlspecialchars(strip_tags($data['description']));
     $status = htmlspecialchars(strip_tags($data['status']));

    $conn = dbConnect();

    if (!$conn) {
        echo json_encode(array("error" => "Kết nối đến cơ sở dữ liệu thất bại"));
        exit();
    }

    // Câu lệnh SQL để thêm một chiến dịch mới
    $sql = "INSERT INTO campaign (name, province, district, location, dateStart, dateEnd, totalMoney, moneyByVNJN, target, timeline, infoContact, infoOrganization, image, description, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        echo json_encode(array("error" => "Không thể chuẩn bị câu lệnh SQL: " . $conn->error));
        exit();
    }

    // Ràng buộc các tham số với truy vấn
    if (!$stmt->bind_param("sssssddsssssss", $name, $province, $district, $location, $dateStart, $dateEnd, $totalMoney, $moneyByVNJN, $target, $timeline, $infoContact, $infoOrganization, $image, $description, $status)) {
        echo json_encode(array("error" => "Lỗi khi ràng buộc tham số: " . $stmt->error));
        $stmt->close();
        $conn->close();
        exit();
    }

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

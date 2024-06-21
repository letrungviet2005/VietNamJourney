<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
require '../db_connect.php';

// Xử lý yêu cầu OPTIONS (preflight của CORS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Kết nối đến cơ sở dữ liệu
$conn = dbConnect();
if (!$conn) {
    http_response_code(500);
    echo json_encode(array("error" => "Kết nối đến cơ sở dữ liệu thất bại"));
    exit();
}

// Câu lệnh SQL để lấy danh sách các chiến dịch
$sql = "SELECT id, name, province, district, location, dateStart, dateEnd, totalMoney, moneyByVNJN, timeline, infoContact, infoOrganization, description, status FROM campaign";
$result = $conn->query($sql);

if ($result) {
    $campaigns = array();
    while ($row = $result->fetch_assoc()) {
        // Xử lý dữ liệu timeline và infoContact từ JSON sang dạng mảng
        $row['timeline'] = json_decode($row['timeline'], true);
        $row['infoContact'] = json_decode($row['infoContact'], true);
        $row['infoOrganization'] = json_decode($row['infoOrganization'], true);
        $campaigns[] = $row;
    }
    
    http_response_code(200);
    echo json_encode($campaigns);
} else {
    http_response_code(500);
    echo json_encode(array("error" => "Lỗi khi truy vấn dữ liệu: " . $conn->error));
}

$conn->close();
?>

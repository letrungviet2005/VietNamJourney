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

    // Lấy tham số userId và campaignId từ dữ liệu JSON
    $userId = isset($data['userId']) ? intval($data['userId']) : null;
    $campaignId = isset($data['campaignId']) ? intval($data['campaignId']) : null;

    // Kiểm tra nếu thiếu tham số bắt buộc
    if (!$userId || !$campaignId) {
        http_response_code(400);
        echo json_encode(array("error" => "Thiếu tham số bắt buộc userId hoặc campaignId"));
        exit();
    }

    // Kết nối đến cơ sở dữ liệu
    $conn = dbConnect();
    if (!$conn) {
        http_response_code(500);
        echo json_encode(array("error" => "Kết nối đến cơ sở dữ liệu thất bại"));
        exit();
    }

    // Câu lệnh SQL để lấy trạng thái từ bảng volunteer
    $sql = "SELECT STATUS FROM volunteer WHERE userId = ? AND campaignId = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(array("error" => "Không thể chuẩn bị câu lệnh SQL: " . $conn->error));
        exit();
    }

    // Ràng buộc các tham số với truy vấn
    $stmt->bind_param("ii", $userId, $campaignId);

    // Thực thi câu lệnh
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            http_response_code(200);
            echo json_encode(array("status" => $row['STATUS']));
        } else {
            // Nếu không có kết quả
            http_response_code(404);
            echo json_encode(array("error" => "Không tìm thấy trạng thái cho userId và campaignId đã cung cấp"));
        }
    } else {
        http_response_code(500);
        echo json_encode(array("error" => "Không thể thực thi câu lệnh: " . $stmt->error));
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(405); // Phương thức không được phép
    echo json_encode(array("error" => "Method not allowed"));
}
?>

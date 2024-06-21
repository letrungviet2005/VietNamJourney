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

// Xử lý yêu cầu GET
if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    // Kiểm tra và lấy tham số tên tỉnh từ phương thức GET
    if (!isset($_GET['province'])) {
        http_response_code(400);
        echo json_encode(array("error" => "Thiếu tham số tên tỉnh"));
        exit();
    }
    $province = $_GET['province'];

    // Kết nối đến cơ sở dữ liệu
    $conn = dbConnect();
    if (!$conn) {
        http_response_code(500);
        echo json_encode(array("error" => "Kết nối đến cơ sở dữ liệu thất bại"));
        exit();
    }

    // Câu lệnh SQL để lấy thông tin thống kê chiến dịch cho tỉnh được chỉ định
    $sql = "
        SELECT 
            (SELECT COUNT(*) FROM campaign WHERE province = ? AND dateStart <= CURDATE() AND dateEnd >= CURDATE()) AS campaignIng,
            (SELECT COUNT(*) FROM campaign WHERE province = ? AND dateStart >= CURDATE()) AS campaignWill,
            (SELECT COUNT(*) FROM campaign WHERE province = ? AND dateEnd <= CURDATE()) AS campaignEd,
            SUM(moneyByVNJN) AS money
        FROM campaign
        WHERE province = ?
    ";

    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(array("error" => "Không thể chuẩn bị câu lệnh SQL: " . $conn->error));
        exit();
    }

    // Bind tham số vào câu lệnh SQL
    $stmt->bind_param("ssss", $province, $province, $province, $province);

    // Thực thi câu lệnh
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $statistics = $result->fetch_assoc(); // Lấy kết quả thống kê

            // Chuyển đổi thành chuỗi JSON và gửi về client
            http_response_code(200);
            echo json_encode($statistics, JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(404);
            echo json_encode(array("error" => "Không tìm thấy thông tin thống kê cho tỉnh $province"));
        }
    } else {
        http_response_code(500);
        echo json_encode(array("error" => "Không thể lấy thông tin thống kê: " . $stmt->error));
    }

    // Đóng kết nối
    $stmt->close();
    $conn->close();
} else {
    http_response_code(405); // Phương thức không được phép
    echo json_encode(array("error" => "Method not allowed"));
}
?>

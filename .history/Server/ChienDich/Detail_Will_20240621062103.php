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

    // Câu lệnh SQL để lấy thông tin chiến dịch với điều kiện tên tỉnh
    $sql = "SELECT * FROM campaign WHERE province = ?  AND dateStart >= CURDATE()";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(array("error" => "Không thể chuẩn bị câu lệnh SQL: " . $conn->error));
        exit();
    }

    // Bind tham số vào câu lệnh SQL
    $stmt->bind_param("s", $province);

    // Thực thi câu lệnh
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $campaigns = array(); // Mảng chứa tất cả các chiến dịch

            // Lặp qua từng dòng kết quả và lưu vào mảng
            while ($row = $result->fetch_assoc()) {
                // Xử lý các giá trị đặc biệt trước khi chuyển đổi thành JSON
                foreach ($row as $key => $value) {
                    // Kiểm tra nếu giá trị là một chuỗi JSON hợp lệ
                    if ($key !== 'image') {
                        if (is_string($value) && (strpos($value, '[') === 0 || strpos($value, '{') === 0)) {
                            $decoded_value = json_decode($value, true);
                            if (json_last_error() === JSON_ERROR_NONE) {
                                $row[$key] = $decoded_value;
                            }
                        }
                    } else {
                        // Encode dữ liệu image sang base64 trước khi gửi về
                        $row[$key] = base64_encode($value);
                    }
                }

                // Thêm dòng dữ liệu vào mảng chiến dịch
                $campaigns[] = $row;
            }

            // Chuyển đổi thành chuỗi JSON và gửi về client
            http_response_code(200);
            echo json_encode($campaigns, JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(404);
            echo json_encode(array("error" => "Không tìm thấy chiến dịch thuộc tỉnh $province"));
        }
    } else {
        http_response_code(500);
        echo json_encode(array("error" => "Không thể lấy thông tin chiến dịch: " . $stmt->error));
    }

    // Đóng kết nối
    $stmt->close();
    $conn->close();
} else {
    http_response_code(405); // Phương thức không được phép
    echo json_encode(array("error" => "Method not allowed"));
}
?>

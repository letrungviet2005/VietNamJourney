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
    // Kiểm tra nếu không có id
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode(array("error" => "Thiếu tham số bắt buộc: id"));
        exit();
    }

    // Lấy id của chiến dịch cần lấy thông tin
    $id = intval($_GET['id']);

    // Kết nối đến cơ sở dữ liệu
    $conn = dbConnect();
    if (!$conn) {
        http_response_code(500);
        echo json_encode(array("error" => "Kết nối đến cơ sở dữ liệu thất bại"));
        exit();
    }

    // Câu lệnh SQL để lấy thông tin chiến dịch
    // $sql = "SELECT name, province, district, location, dateStart, dateEnd, totalMoney, moneyByVNJN, timeline, infoContact, infoOrganization, description FROM campaign WHERE id = ?";
    $sql = "SELECT *, (select COUNT(*) from volunteer where campaignId= $id and status = 2) as joined FROM campaign WHERE id = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(array("error" => "Không thể chuẩn bị câu lệnh SQL: " . $conn->error));
        exit();
    }

    // Ràng buộc tham số với truy vấn
    $stmt->bind_param("i", $id);

    // Thực thi câu lệnh
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $campaign = $result->fetch_assoc(); // Lấy mảng kết hợp của chiến dịch

            // Xử lý các giá trị đặc biệt trước khi chuyển đổi thành JSON
            foreach ($campaign as $key => $value) {
              // Kiểm tra nếu giá trị là một chuỗi JSON hợp lệ
              if( $key !== 'image') {
                if (is_string($value) && (strpos($value, '[') === 0 || strpos($value, '{') === 0)) {
                  $decoded_value = json_decode($value, true);
                  if (json_last_error() === JSON_ERROR_NONE) {
                      $campaign[$key] = $decoded_value;
                  }
                }
              } else {
                $campaign[$key] = base64_encode($value);
              }
          }
          
          // Chuyển đổi thành chuỗi JSON và gửi về client
          http_response_code(200);
          echo json_encode($campaign, JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(404);
            echo json_encode(array("error" => "Không tìm thấy chiến dịch với id = $id"));
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

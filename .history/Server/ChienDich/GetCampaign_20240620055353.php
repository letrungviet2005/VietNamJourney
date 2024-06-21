<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8"); 
require '../db_connect.php'; // Đảm bảo path đến file db_connect.php là chính xác

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  // Xử lý yêu cầu preflight
  header("HTTP/1.1 200 OK");
  exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  $conn = dbConnect(); // Hàm kết nối CSDL, bạn cần thay đổi phù hợp với cách kết nối CSDL của bạn

  // Kiểm tra kết nối
  if (!$conn) {
    $response = array("error" => "Kết nối đến cơ sở dữ liệu thất bại");
  } else {
    $conn->set_charset("utf8mb4");

    // Lấy ID chiến dịch từ tham số GET
    if (isset($_GET['id'])) {
      $id = $_GET['id'];

      // Chuẩn bị truy vấn để lấy thông tin chiến dịch
      $sql = "SELECT *, 
                     (SELECT COUNT(*) FROM volunteer WHERE campaignId = campaign.id AND status = 1) AS joined, 
                     (SELECT COUNT(*) FROM volunteer WHERE campaignId = campaign.id AND status = 0) AS pending
              FROM campaign
              WHERE id = ?";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("s", $id);
      $stmt->execute();
      $result = $stmt->get_result();

      if ($result->num_rows > 0) {
        // Lặp qua kết quả và lấy thông tin chiến dịch
        $row = $result->fetch_assoc();
        $campaignData = array(
          "id" => $row['id'],
          "name" => $row['name'],
          "province" => $row['province'],
          "district" => $row['district'],
          "status" => $row['status'],
          "joined" => $row['joined'],
          "pending" => $row['pending']
          // Thêm các trường thông tin khác nếu cần
        );

        $response = array("data" => $campaignData);
      } else {
        // Không tìm thấy chiến dịch với ID tương ứng
        $response = array("error" => "Không tìm thấy chiến dịch");
      }

      // Đóng kết nối
      $stmt->close();
    } else {
      // Nếu không có ID được cung cấp từ yêu cầu GET
      $response = array("error" => "Yêu cầu thiếu tham số ID");
    }

    $conn->close();
  }

  echo json_encode($response, JSON_UNESCAPED_UNICODE);
} else {
  header("HTTP/1.1 405 Method Not Allowed");
  echo json_encode(array("error" => "Method not allowed"));
}
?>

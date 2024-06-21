<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8"); 
require '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  // Xử lý yêu cầu preflight
  header("HTTP/1.1 200 OK");
  exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $data = json_decode(file_get_contents("php://input"), true);
  $userId = isset($data['userId']) ? $data['userId'] : null;

  $conn = dbConnect();

  if (!$conn) {
    $response = array("error" => "Kết nối đến cơ sở dữ liệu thất bại");
  } else {
    $conn->set_charset("utf8mb4");

    // SQL Query to fetch campaign data along with the count of volunteers who have joined and are pending
    $sql = "SELECT *, 
                   (SELECT COUNT(*) FROM volunteer WHERE campaignId=campaign.id AND STATUS=1) AS joined, 
                   (SELECT COUNT(*) FROM volunteer WHERE campaignId=campaign.id AND STATUS=0) AS pending 
            FROM campaign WHERE userId = ? ORDER BY dateEnd";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    // Get the current date
    $currentDate = date('Y-m-d');

    $campaignList = [];
    while ($row = $result->fetch_assoc()) {
      // Determine the status based on the current date
      $status = '';
      if ($row['dateStart'] > $currentDate) {
        $status = 'sắp diễn ra';
      } elseif ($row['dateEnd'] < $currentDate) {
        $status = 'đã kết thúc';
      } else {
        $status = 'đang diễn ra';
      }

      $campaignList[] = array(
        "id" => $row['id'],
        "name" => $row['name'],
        "province" => $row['province'],
        "district" => $row['district'],
        "status" => $status, // Use the calculated status
        "joined" => $row['joined'],
        "pending" => $row['pending']
      );
    }

    if (count($campaignList) > 0) {
      $response = array("list" => $campaignList);
    } else {
      $response = array("error" => "Không có chiến dịch nào");
    }

    // Close the connection
    $conn->close();
  }

  echo json_encode($response, JSON_UNESCAPED_UNICODE);
} else {
  header("HTTP/1.1 405 Method Not Allowed");
  echo json_encode(array("error" => "Method not allowed"));
}

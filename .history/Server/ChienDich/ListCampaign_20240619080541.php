<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  // Xử lý yêu cầu preflight
  header("HTTP/1.1 200 OK");
  exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $conn = dbConnect();

  if (!$conn) {
    $response = array("error" => "Kết nối đến cơ sở dữ liệu thất bại");
  } else {
    $sql = "SELECT *, 
                    (SELECT COUNT(*) FROM volunteer WHERE campaignId=campaign.id AND STATUS=1) AS joined, 
                    (SELECT COUNT(*) FROM volunteer WHERE campaignId=campaign.id AND STATUS=0) AS pending
                    FROM campaign";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
      $campaignList[] = array(
        "id" => $row['id'],
        "name" => $row['name'],
        "province" => $row['province'],
        "district" => $row['district'],
        "status" => $row['status'],
        "joined" => $row['joined'],
        "pending" => $row['pending']
      );
    }

    if (count($campaignList) > 0) {
      $response = array("list" => $campaignList);
    } else {
      $response = array("error" => "Không có chiến dịch nào");
    }

    // Đóng kết nối
    $conn->close();
  }

  echo json_encode($response);
} else {
  header("HTTP/1.1 405 Method Not Allowed");
  echo json_encode(array("error" => "Method not allowed"));
}

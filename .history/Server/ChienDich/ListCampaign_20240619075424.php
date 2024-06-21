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
    $data = json_decode(file_get_contents("php://input"), true);
    $id = isset($data['id']) ? $data['id'] : null;

    $conn = dbConnect();

    if (!$conn) {
        $response = array("error" => "Kết nối đến cơ sở dữ liệu thất bại");
    } else {
        if ($userId) {
            // Lấy thông tin người dùng
            $sql = "SELECT *, 
                    (SELECT COUNT(*) FROM volunteer WHERE campaignId=campaign.id AND STATUS=1) AS joined, 
                    (SELECT COUNT(*) FROM volunteer WHERE campaignId=campaign.id AND STATUS=0) AS pending
                    FROM campaign";
            $stmt = $conn->prepare($sqlUser);
            $stmt->bind_param("i", $userId);
            $stmt->execute();
            $result = $stmt->get_result();
            $list = $result->fetch_assoc();

            if ($list) {
                $response = array(
                    "list" => array(
                        "id" => $list['id'],
                        "name" => $list['name'],
                        
                        "status" => $list['status'],
                        "joined" => $list['joined'],
                        "pending" => $list['pending']
                        
                    )

                );
            } else {
                $response = array("error" => "Không tìm thấy người dùng");
            }
        } else {
            $response = array("error" => "User ID không hợp lệ");
        }

        // Đóng kết nối
        $conn->close();
    }

    echo json_encode($response);
} else {
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(array("error" => "Method not allowed"));
}
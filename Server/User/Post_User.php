<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require '../db_connect.php';

function timeElapsedString($datetime, $full = false)
{
    $timezone = new DateTimeZone('Asia/Ho_Chi_Minh');
    $now = new DateTime('now', $timezone);
    $ago = new DateTime($datetime, $timezone);
    $diff = $now->diff($ago);

    $string = array(
        'y' => 'năm',
        'm' => 'tháng',
        'd' => 'ngày',
        'h' => 'giờ',
        'i' => 'phút',
    );
    foreach ($string as $k => &$v) {
        if ($diff->$k) {
            $v = $diff->$k . ' ' . $v;
        } else {
            unset($string[$k]);
        }
    }

    if (!$full) $string = array_slice($string, 0, 1);
    return $string ? implode(', ', $string) . ' trước' : 'vừa xong';
}

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
        if ($userId) {

            $sqlUser = "SELECT * FROM user_information WHERE User_ID = ?";
            $stmtUser = $conn->prepare($sqlUser);
            $stmtUser->bind_param("i", $userId);
            $stmtUser->execute();
            $resultUser = $stmtUser->get_result();
            $user = $resultUser->fetch_assoc();

            // Lấy các bài viết của người dùng
            $sqlPosts = "SELECT * FROM post WHERE User_ID = ?";
            $stmtPosts = $conn->prepare($sqlPosts);
            $stmtPosts->bind_param("i", $userId);
            $stmtPosts->execute();
            $resultPosts = $stmtPosts->get_result();
            $posts = array();

            while ($row = $resultPosts->fetch_assoc()) {
                $post = array(
                    "id" => $row['Post_ID'],
                    "content" => $row["Content"],
                    "image" => $row["Image"],
                    "createdAt" => timeElapsedString($row["CreateAt"]),
                    "likes" => $row["Like"],
                    "comments" => $row["Comment"]
                );
                $posts[] = $post;
            }

            $response = array(
                "user" => $user,
                "posts" => $posts
            );
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

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

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $postId = isset($data['post_ID']) ? $data['post_ID'] : null;

    $conn = dbConnect();

    if (!$conn) {
        $response = array("error" => "Kết nối đến cơ sở dữ liệu thất bại");
    } else {
        if ($postId) {

            $sqlComment = "SELECT User_ID, Content,CreateAt FROM comment WHERE Post_ID = ?";
            $stmtComment = $conn->prepare($sqlComment);
            $stmtComment->bind_param("i", $postId);
            $stmtComment->execute();
            $resultComment = $stmtComment->get_result();

            $comments = array();
            while ($row = $resultComment->fetch_assoc()) {

                $userId = $row['User_ID'];
                $sqlUser = "SELECT Name, Image FROM User_Information WHERE User_ID = ?";
                $stmtUser = $conn->prepare($sqlUser);
                $stmtUser->bind_param("i", $userId);
                $stmtUser->execute();
                $resultUser = $stmtUser->get_result();
                $user = $resultUser->fetch_assoc();

                if ($user) {
                    $comments[] = array(
                        "username" => $user['Name'],
                        "avatar" => $user['Image'],
                        "content" => $row['Content'],
                        "time" => timeElapsedString($row["CreateAt"])
                    );
                }
            }

            if ($comments) {
                $response = array("comments" => $comments);
            } else {
                $response = array("error" => "Không tìm thấy bình luận cho bài đăng này");
            }
        } else {
            $response = array("error" => "Post ID không hợp lệ");
        }

        // Đóng kết nối
        $conn->close();
    }

    echo json_encode($response);
} else {
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(array("error" => "Method not allowed"));
}

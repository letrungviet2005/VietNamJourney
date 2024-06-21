<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require '../db_connect.php';
$conn = dbConnect();

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
    header("HTTP/1.1 200 OK");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $Post_ID = isset($input['Post_ID']) ? (int)$input['Post_ID'] : null;
    if (!$Post_ID) {
        echo json_encode(['success' => false, 'error' => 'Missing Post_ID']);
        exit();
    }

    $query = "
        SELECT c.User_ID, c.Content, c.ImageComment, c.CreateAt, u.Name, u.Image
        FROM comment c
        JOIN user_information u ON c.User_ID = u.User_ID
        WHERE c.Post_ID = ?
        ORDER BY c.CreateAt DESC
        LIMIT 1
    ";

    $stmt = $conn->prepare($query);
    if ($stmt === false) {
        error_log('Prepare failed: ' . $conn->error);
        echo json_encode(['success' => false, 'error' => 'Prepare failed: ' . $conn->error]);
        exit();
    }

    $stmt->bind_param("i", $Post_ID);
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $comment = $result->fetch_assoc();
            $comment['Image'] = base64_encode($comment['Image']);
            if ($comment['ImageComment']) {
                $comment['ImageComment'] = base64_encode($comment['ImageComment']);
            }
            $comment['CreateAt'] = timeElapsedString($comment['CreateAt']);
            echo json_encode(['success' => true, 'comment' => $comment]);
        } else {
            echo json_encode(['success' => true, 'comment' => null]);
        }
    } else {
        error_log('Execute failed: ' . $stmt->error);
        echo json_encode(['success' => false, 'error' => 'Execute failed: ' . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}

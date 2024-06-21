<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require '../db_connect.php';
$conn = dbConnect();

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $User_ID = isset($input['User_ID']) ? (int)$input['User_ID'] : null;
    $Post_ID = isset($input['Post_ID']) ? (int)$input['Post_ID'] : null;
    $Content = isset($input['Content']) ? trim($input['Content']) : '';
    $ImageComment = isset($input['ImageComment']) ? $input['ImageComment'] : null;

    if (!$User_ID || !$Post_ID || (!$Content && !$ImageComment)) {
        echo json_encode(['success' => false, 'error' => 'Missing required fields']);
        exit();
    }

    if ($ImageComment) {
        $ImageComment = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $ImageComment));
    }

    $CreateAt = new DateTime("now", new DateTimeZone('Asia/Ho_Chi_Minh'));
    $CreateAtFormatted = $CreateAt->format('Y-m-d H:i:s');

    $stmt = $conn->prepare("INSERT INTO comment (Post_ID, User_ID, Content, ImageComment, CreateAt) VALUES (?, ?, ?, ?, ?)");
    if (!$stmt) {
        echo json_encode(['success' => false, 'error' => 'Prepare failed: ' . $conn->error]);
        exit();
    }

    $stmt->bind_param("iisss", $Post_ID, $User_ID, $Content, $ImageComment, $CreateAtFormatted);

    if ($stmt->execute()) {
        $stmt->close();

        $query = "SELECT Name, Image FROM user_information WHERE User_ID = ?";
        $stmt = $conn->prepare($query);
        if (!$stmt) {
            echo json_encode(['success' => false, 'error' => 'Prepare failed: ' . $conn->error]);
            exit();
        }

        $stmt->bind_param("i", $User_ID);

        if ($stmt->execute()) {
            $result = $stmt->get_result();
            $userInfo = $result->fetch_assoc();
            $stmt->close();
            $conn->close();

            $comment = [
                'user_ID' => $User_ID,
                'avatar' => 'data:image/jpeg;base64,' . base64_encode($userInfo['Image']),
                'username' => $userInfo['Name'],
                'content' => $Content,
                'imageComment' => $ImageComment ? 'data:image/jpeg;base64,' . base64_encode($ImageComment) : null,
                'time' => 'vừa xong'
            ];

            echo json_encode(['success' => true, 'comment' => $comment]);
            exit();
        } else {
            echo json_encode(['success' => false, 'error' => 'Execute failed: ' . $stmt->error]);
            exit();
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Execute failed: ' . $stmt->error]);
        $stmt->close();
        $conn->close();
        exit();
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}

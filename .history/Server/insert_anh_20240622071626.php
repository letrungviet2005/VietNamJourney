<?php
require 'db_connect.php';
$conn = dbConnect();

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối đến cơ sở dữ liệu thất bại: " . $conn->connect_error);
}

$imagePath = "../src/Images/url/9779-1647851441-images5497234-z3275669554669-f94a3da385845c1c5f6b042912217ed1.jpg";

// Đọc dữ liệu từ file ảnh
$imageData = file_get_contents($imagePath);

// Chuẩn bị câu lệnh SQL UPDATE
$sql = "UPDATE post SET Image = ? WHERE Post_ID = 8";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    die("Lỗi trong quá trình chuẩn bị câu lệnh SQL: " . $conn->error);
}

// Chuyển dữ liệu ảnh thành dạng blob
$null = NULL;
$stmt->bind_param("b", $null);
$stmt->send_long_data(0, $imageData);

// Thực hiện câu lệnh UPDATE
if ($stmt->execute()) {
    echo "Cập nhật ảnh thành công.";
} else {
    echo "Lỗi: " . $stmt->error;
}

// Đóng kết nối
$stmt->close();
$conn->close();

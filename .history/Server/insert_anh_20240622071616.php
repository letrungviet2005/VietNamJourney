<?php
require 'db_connect.php';
$conn = dbConnect();

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối đến cơ sở dữ liệu thất bại: " . $conn->connect_error);
}

$imagePath = "../src/Images/url/743-1.7.jpg";

// Đọc dữ liệu từ file ảnh
$imageData = file_get_contents($imagePath);

// Chuẩn bị câu lệnh SQL UPDATE
$sql = "UPDATE post SET Image = ? WHERE Post_ID = 7";
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
import classNames from "classnames/bind";
import style from "./ChiTiet.module.scss";
import { useState } from "react"; // Import useState
import { getCookie } from "../../../";

const cx = classNames.bind(style);

function ChiTiet({ campaign }) {
  // State to keep track of the button status
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false); // State to manage loading state

  // Function to handle the button click
  const handleRegisterClick = async () => {
    setLoading(true); // Set loading to true while the API call is in progress

    // Create the payload for the API call
    const payload = {
      userId: getCookie('User_ID'), // Replace with dynamic user ID
      campaignId: campaign.id,
      status: 1, // Initial status
    };

    try {
      // Call the API
      const response = await fetch('http://localhost/bwd/VietNamJourney/Server/ChienDich/Register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Check if the response is successful
      if (response.ok) {
        // If successful, update the button state
        setIsRegistered(true);
      } else {
        // Handle the error if the API call fails
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert('Đăng ký tham gia thất bại. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setLoading(false); // Set loading to false after the API call is finished
    }
  };

  return (
    <div className={cx("ChiTiet")}>
      <div className={cx("row")}>
        <div className={cx("col-6", "left")}>
          <hr />
          <div className={cx("title")}>Thời gian dự án</div>
          <div className={cx("time")}>
            <div className={cx("inner-title")}>Giai đoạn ban đầu</div>
            <div className={cx("desc")}>{campaign.timeline[0].value}</div>
            <div className={cx("inner-title")}>Bắt đầu dự án</div>
            <div className={cx("desc")}>{campaign.timeline[1].value}</div>
            <div className={cx("inner-title")}>Kết thúc dự án</div>
            <div className={cx("desc")}>{campaign.timeline[2].value}</div>
            <div className={cx("inner-title")}>Tổng kết dự án</div>
            <div className={cx("desc")}>{campaign.timeline[3].value}</div>
          </div>
        </div>
        <div className={cx("col-6", "right")}>
          <hr />
          <div className={cx("title")}>Đăng ký tham gia</div>
          <div className={cx("register")}>
            <div className={cx("desc")}>Số lượng TNV tham gia: 30 TNV</div>
            <button
              className={cx("button")}
              onClick={handleRegisterClick} // Handle click event
              disabled={isRegistered || loading} // Disable the button if already registered or loading
            >
              {loading ? "Đang xử lý..." : isRegistered ? "Đang chờ duyệt" : "Đăng ký tham gia"}
            </button>
          </div>
          <hr />
          <div className={cx("title")}>Địa điểm cụ thể</div>
          <pre className={cx("desc")}>{campaign.location}</pre>
        </div>
      </div>
      <div className={cx("line")}></div>
    </div>
  );
}

export default ChiTiet;

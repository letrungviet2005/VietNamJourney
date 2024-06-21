import classNames from "classnames/bind";
import style from "./ChiTiet.module.scss";
import { useState, useEffect } from "react"; // Import useEffect
import { getCookie } from "../../../../../Cookie/getCookie";

const cx = classNames.bind(style);

function ChiTiet({ campaign }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // State to keep track of volunteer status

  // Function to handle the button click
  const handleRegisterClick = async () => {
    setLoading(true);

    const payload = {
      userId: getCookie('User_ID'), // Replace with dynamic user ID
      campaignId: campaign.id,
      status: 1,
    };

    try {
      const response = await fetch('http://localhost/bwd/VietNamJourney/Server/ChienDich/Register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsRegistered(true);
        setStatus(1); // Update the status to 1 after registration
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert('Đăng ký tham gia thất bại. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch the status from the API
  const fetchVolunteerStatus = async () => {
    const payload = {
      userId: getCookie('User_ID'), // Replace with dynamic user ID
      campaignId: campaign.id,
    };

    try {
      const response = await fetch('http://localhost/bwd/VietNamJourney/Server/ChienDich/GetVolunteer.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setStatus(data.status); // Set the status from API response
      } else {
        console.error('Failed to fetch volunteer status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // useEffect to call fetchVolunteerStatus on mount
  useEffect(() => {
    fetchVolunteerStatus();
  }, [campaign.id]);

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
            {status === null && <button className={cx("button")} disabled>Đang tải...</button>}
            {status === 0 && (
              <button
                className={cx("button")}
                onClick={handleRegisterClick}
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Đăng ký tham gia"}
              </button>
            )}
            {status === 1 && (
              <button className={cx("button")} disabled>
                Đang chờ duyệt
              </button>
            )}
            {status === 2 && null} {/* Button is hidden when status is 2 */}
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

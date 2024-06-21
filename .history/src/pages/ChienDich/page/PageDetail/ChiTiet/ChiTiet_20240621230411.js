import classNames from "classnames/bind";
import style from "./ChiTiet.module.scss";
import { useState } from "react"; // Import useState
import { useLocation } from "react-router-dom";
import 

const cx = classNames.bind(style);

function ChiTiet({ campaign }) {
  // State to keep track of the button status
  const [isRegistered, setIsRegistered] = useState(false);

  // Function to handle the button click
  const handleRegisterClick = () => {
    setIsRegistered(true);
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
              disabled={isRegistered} // Optionally disable the button after clicking
            >
              {isRegistered ? "Đang chờ duyệt" : "Đăng ký tham gia"}
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

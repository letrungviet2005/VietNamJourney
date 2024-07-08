import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import style from "./TongQuan.module.scss";
import axios from "axios";
import { getCookie } from "../../../../../Cookie/getCookie";


const cx = classNames.bind(style);

function TongQuan({ campaign }) {
  const currentDate = new Date(); // Lấy ngày hiện tại
  const dateStart = new Date(campaign.dateStart); 
  const dateEnd = new Date(campaign.dateEnd); 

  const [status, setStatus] = useState(null); 
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true); // Bắt đầu loading khi gọi API

      try {
        const formData = new FormData();
        formData.append("userId", getCookie('User_ID'));
        formData.append("campaignId", campaign.id);

        formData.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });

        const response = await axios.post(
          'http://localhost:8000/api/getStatusVolunteer',
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setStatus(response.data.status); // Cập nhật trạng thái từ API
      } catch (error) {
        setError(error.message || 'Unknown error');
        console.error('Error:', error);
      } finally {
        setLoading(false); // Kết thúc loading sau khi gọi API xong
      }
    };

    fetchStatus(); // Gọi hàm fetchStatus khi component được mount

  }, [campaign.id]); // Chỉ gọi lại useEffect khi campaign.id thay đổi


  let statusText = "Đang diễn ra"; // Mặc định là 'Đang diễn ra'
  if (currentDate < dateStart) {
    statusText = "Sắp diễn ra";
  } else if (currentDate > dateEnd) {
    statusText = "Đã kết thúc";
  }

  return (
    <div className={cx("TongQuan")}>
      <div className={cx("left")}>
        <hr />
        <div className={cx("inner")}>
          <p className={cx("title")}>TÌNH TRẠNG</p>
          <p className={cx("time")}>{statusText}</p> {/* Hiển thị status từ API nếu có */}
        </div>
        <div className={cx("inner")}>
          <p className={cx("title")}>NGÀY BẮT ĐẦU</p>
          <p className={cx("time")}>{campaign.dateStart}</p>
        </div>
        <div className={cx("inner")}>
          <p className={cx("title")}>NGÀY KẾT THÚC</p>
          <p className={cx("time")}>{campaign.dateEnd}</p>
        </div>
        <div className={cx("inner")}>
          <p className={cx("title")}>ĐỊA ĐIỂM</p>
          <p className={cx("time")}>{campaign.district}</p>
        </div>
      </div>
      <div className={cx("right")}>
        <pre className={cx("description")}>
          {/* {campaign.description} */}
          <div dangerouslySetInnerHTML={{ __html: campaign.description }} />
        </pre>
      </div>
      <div className={cx("info")}>
        <div className={cx("title")}>THÔNG TIN ĐĂNG KÝ THAM GIA</div>
        <div className={cx("buttons")}>
          {/* Cập nhật các button dựa trên giá trị của status */}
          {status === 0 && (
            <button className={cx("button-red", "button")}>
              Bạn chưa đăng ký tham gia
            </button>
          )}
          {status === 1 && (
            <button className={cx("button-blue", "button")}>
              Thông tin đang chờ duyệt
            </button>
          )}
          {status === 2 && (
            <button className={cx("button-green", "button")}>
              Bạn là thành viên của chiến dịch
            </button>
          )}
          {status === null && (
            <button className={cx("button-red", "button")}>
              Bạn chưa đăng ký tham gia
            </button>
          )}
        </div>
        <div className={cx("contact")}>
          <p className={cx("title")}>Mọi thắc mắc xin liên hệ:</p>
          <p className={cx("email")}>
            Ban Nhân sự: hr.fp{campaign.id}@contact.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default TongQuan;

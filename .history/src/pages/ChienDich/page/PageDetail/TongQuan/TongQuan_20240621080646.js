import classNames from "classnames/bind";
import style from "./TongQuan.module.scss";

const cx = classNames.bind(style);

function TongQuan({ campaign }) {
  const currentDate = new Date(); // Lấy ngày hiện tại
  const dateStart = new Date(campaign.dateStart); // Chuyển đổi ngày bắt đầu từ chuỗi
  const dateEnd = new Date(campaign.dateEnd); // Chuyển đổi ngày kết thúc từ chuỗi

  let status = "Đang diễn ra"; // Mặc định là 'Đang diễn ra'
  if (currentDate < dateStart) {
    status = "Sắp diễn ra";
  } else if (currentDate > dateEnd) {
    status = "Đã kết thúc";
  }

  return (
    <div className={cx("TongQuan")}>
      <div className={cx("left")}>
        <hr />
        <div className={cx("inner")}>
          <p className={cx("title")}>TÌNH TRẠNG</p>
          <p className={cx("time")}>{status}</p>
        </div>
        <div className={cx("inner")}>
          <p className={cx("title")}>NGÀY BẮT ĐẦU</p>
          <p className={cx("time")}>{campaign.dateStart}</p>
        </div>
        <div className={cx("inner")}>
          <p className={cx("title")}>NGÀY KẾT THÚC</p>
          <p className={cx("time")}>campaign.dateEnd</p>
        </div>
        <div className={cx("inner")}>
          <p className={cx("title")}>ĐỊA ĐIỂM</p>
          <p className={cx("time")}>campaign.district</p>
        </div>
      </div>
      <div className={cx("right")}>
        <pre>
          {campaign.}
        </pre>
      </div>
      <div className={cx("info")}>
        <div className={cx("title")}>THÔNG TIN ĐĂNG KÝ THAM GIA</div>
        <div className={cx("buttons")}>
          <button className={cx("button-red", "button")}>
            Bạn chưa đăng ký tham gia
          </button>
          <button className={cx("button-blue", "button")}>
            Thông tin đang chờ duyệt
          </button>
          <button className={cx("button-green", "button")}>
            Bạn là thành viên của chiến dịch
          </button>
        </div>
        <div className={cx("info-registered")}>
          <p className={cx("name")}>LÊ HỮU ANH TÚ</p>
          <p className={cx("ban")}>BAN HẬU CẦN</p>
        </div>
        <div className={cx("contact")}>
          <p className={cx("title")}>Mọi thắc mắc xin liên hệ:</p>
          <p className={cx("email")}>Ban Nhân sự: hr.fp095@contact.com</p>
        </div>
      </div>
    </div>
  );
}

export default TongQuan;

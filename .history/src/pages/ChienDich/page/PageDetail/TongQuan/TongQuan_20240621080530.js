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
          <p className={cx("time")}>{campaign.}</p>
        </div>
        <div className={cx("inner")}>
          <p className={cx("title")}>NGÀY KẾT THÚC</p>
          <p className={cx("time")}>01/12/2024</p>
        </div>
        <div className={cx("inner")}>
          <p className={cx("title")}>ĐỊA ĐIỂM</p>
          <p className={cx("time")}>Huyện Triệu Phong</p>
        </div>
      </div>
      <div className={cx("right")}>
        <p>
          Dự án cung cấp các khoản vay và hỗ trợ kỹ thuật tại 17 quốc gia đang
          phát triển trên khắp Châu Phi, Châu Mỹ Latinh và Caribe để tạo ra các
          thị trường tự duy trì về hiệu quả năng lượng, năng lượng tái tạo và
          khả năng phục hồi khí hậu.
        </p>
        <p>
          Khu vực tư nhân ở hai khu vực này vẫn nhận thấy năng lượng bền vững và
          khả năng phục hồi khí hậu là tốn kém và phức tạp, vì lợi ích môi
          trường của các khoản đầu tư và thực hành có khả năng chống chịu tốt
          hơn vẫn chưa được hiểu rõ. Cần phải có những nỗ lực để chứng minh lợi
          ích của việc tài trợ cho các lĩnh vực này để đạt được khối lượng tới
          hạn và nâng cao khả năng thương mại của các dự án khí hậu.
        </p>
        <p>
          Mục tiêu chính của chương trình này là tăng quy mô tài chính khí hậu ở
          các quốc gia mục tiêu, chuyển hướng dòng tài chính và củng cố năng lực
          của các đối tác địa phương trong các lĩnh vực liên quan đến khí hậu.
          Nó sẽ thực hiện điều này bằng cách cung cấp các khoản vay thông qua
          các tổ chức tài chính đối tác địa phương cho người vay về năng lượng
          bền vững, hiệu quả năng lượng, nhà ở, nông nghiệp, lâm nghiệp, quản lý
          nước và chất thải. Nó cũng sẽ bao gồm một thành phần hỗ trợ kỹ thuật.
        </p>
        <p>Chương trình này có ước tính sẽ kéo dài 20 năm.</p>
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
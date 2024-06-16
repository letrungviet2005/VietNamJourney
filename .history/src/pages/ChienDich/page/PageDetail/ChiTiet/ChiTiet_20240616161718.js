import classNames from "classnames/bind";
import style from "./ChiTiet.module.scss";

const cx = classNames.bind(style);

function ChiTiet() {
  return (
    <div className={cx("ChiTiet")}>
      <div className={cx("row")}>
        <div className={cx("col-6", "left")}>
          <hr />
          <div className={cx("title")}>Thời gian dự án</div>
          <div className={cx("time")}>
            <div className={cx("inner-title")}>Giai đoạn ban đầu</div>
            <div className={cx("desc")}>Từ 08/06 - Kéo dài 30 ngày</div>
            <div className={cx("inner-title")}>Bắt đầu dự án</div>
            <div className={cx("desc")}>Từ 08/07 - Kéo dài 150 ngày</div>
            <div className={cx("inner-title")}>Kết thúc dự án</div>
            <div className={cx("desc")}>Từ 01/12 - Còn 34 ngày</div>
            <div className={cx("inner-title")}>Tổng kết dự án</div>
            <div className={cx("desc")}>Tháng 12</div>
          </div>
        </div>
        <div className={cx("col-6", "right")}>
          <hr />
          <div className={cx("title")}>Đăng ký tham gia</div>
          <>
            <div className={cx("desc")}>Ban Hậu cần: 30 TNV</div>
          </>
          <>
            <div className={cx("desc")}>Ban Truyền thông: 3 TNV</div>
          </>
          <hr />
          <div className={cx("title")}>Địa điểm cụ thể</div>
          <div className={cx("desc")}>Trường Tiểu học Triệu Vân</div>
          <div className={cx("desc")}>Trường Trung học cơ sở Triệu Độ</div>
          <div className={cx("desc")}>Trường TH & THCS Triệu Trung</div>
        </div>
      </div>
      <div className={cx('line')}></div>
    </div>
  );
}

export default ChiTiet;

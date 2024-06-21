import classNames from "classnames/bind";
import style from "./ChiTiet.module.scss";

const cx = classNames.bind(style);

function ChiTiet({campaign}) {
  console.log(campaign.location);

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
          <div className={cx('register')}>
            <div className={cx("desc")}>Số lượng TNV tham gia: 30 TNV</div>
            <button className={cx('button')}>Đăng ký tham gia</button>
          </div>
          <hr />
          <div className={cx("title")}>Địa điểm cụ thể</div>
          <div className={cx("desc")}>{ }</div>
        </div>
      </div>
      <div className={cx('line')}></div>
    </div>
  );
}

export default ChiTiet;

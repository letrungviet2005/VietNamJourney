import classNames from "classnames/bind";
import style from './PageDetail.module.scss';

const cx = classNames.bind(style);

function PageDetail() {
  return (  
    <div className={cx('PageDetail')}>
      <div className={cx('header')}>
        <p className={cx('title')}>Dự án & Chiến dịch</p>
        <p className={cx('camp-id')}>FP095</p>
        <p className={cx('desc')}>Xây dựng thói quen bảo vệ môi trường cho học sinh</p>
      </div>
      <div className={cx('menu')}>
        <ul>
          <li>
            Tổng quan
          </li>
          <li>
            Tác động
          </li>
          <li>
            Chi tiết
          </li>
          <li>
            Thông tin thêm
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PageDetail;
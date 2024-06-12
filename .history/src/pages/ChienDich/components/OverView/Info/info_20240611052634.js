import classNames from "classnames/bind";
import style from './info.module.scss';

const cx = classNames.bind(style);

function Info({ className }) {
  return ( 
    <div className={className}>
      <div className={cx('info')}>
        <img src="https://toplist.vn/images/800px/cau-hien-luong-song-ben-hai-507421.jpg" alt="Ảnh"/>
        <div className={cx('title')}>
          Tổng quan - <span>Tỉnh Quảng Trị</span>
        </div>
        
        <div className={cx('total', 'row')}>
          <div className={cx('total-campaign', 'col-4')}>
            <p>Tổng số chiến dịch</p>
            <div className={cx('number')}>11</div>
          </div>
          <div className={cx('total-fund', 'col-8')}>
          <p>Tổng số tiền quỹ VIETNAMJOURNEY tài trợ</p>
          <div className={cx('number')}>165 tr. đồng</div>
          </div>
        </div>
        <div className={cx('detail', 'row')}>
          <div className={cx('section-campaign', 'col-4')}>
            <p>Chiến dịch đang diễn ra</p>
            <div className={cx('number')}>3</div>
          </div>
          <div className={cx('section-campaign', 'col-4')}>
            <p>Chiến dịch sắp tới</p>
            <div className={cx('number')}>6</div>
          </div>
          <div className={cx('section-campaign', 'col-4')}>
            <p>Chiến dịch đã kết thúc</p>
            <div className={cx('number')}>2</div>
          </div>
        </div>
      </div>
    </div>
   );
}

export default Info;
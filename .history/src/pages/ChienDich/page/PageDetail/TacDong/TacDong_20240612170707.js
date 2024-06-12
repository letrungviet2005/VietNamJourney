import classNames from "classnames/bind";
import style from './TacDong.module.scss';

const cx = classNames.bind(style);

function TacDong() {
  return (  
    <div className={cx('TacTong')}>
      <div className={cx('row')}>
        <div className={cx('col-6')}>
          <div className={cx('title')}>
            Tổng giá trị dự án
          </div>
          <div className={cx('number')}>
            62.3 tr. đồng
          </div>
        </div>
        <div className={cx('col-6')}>
          <div className={cx('title')}>
            Quỹ VIETNAM JOURNEY tài trợ
          </div>
          <div className={cx('number')}>
          30 tr. đồng
          </div>
        </div>
      </div>
      <div className={cx('row')}>
        <div className={cx('col-6')}>
          <div className={cx('title')}>

          </div>
          <div className={cx('desc')}>
            
          </div>
        </div>
        <div className={cx('col-6')}>
          <div className={cx('title')}>

          </div>
          <div className={cx('desc')}>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default TacDong;
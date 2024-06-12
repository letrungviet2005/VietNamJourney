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
            
          </div>
        </div>
        <div className={cx('col-6')}>
          <div className={cx('title')}>

          </div>
          <div className={cx('number')}>
            
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
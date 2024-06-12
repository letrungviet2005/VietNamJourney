import classNames from "classnames/bind";
import style from './ChiTiet.module.scss';

const cx = classNames.bind(style);

function ChiTiet() {
  return (  
    <div className={cx('ChiTiet')}>
      <div className={cx('row')}>
        <div className={cx('col-6', 'left')}>
          <div className={cx('title')}>
            Thời gian dự án
          </div>
          <div className={cx('time')}>
            <div className={cx('inner-title')}>
            Giai đoạn ban đầu
            </div>
            <div className={cx('desc')}>

            </div>
            <div className={cx('inner-title')}>

            </div>
            <div className={cx('desc')}>

            </div>
            <div className={cx('inner-title')}>

            </div>
            <div className={cx('desc')}>

            </div>
            <div className={cx('inner-title')}>

            </div>
            <div className={cx('desc')}>

            </div>            
          </div>
        </div>
        <div className={cx('col-6', 'right')}>
          <div className={cx('title')}>

          </div>
          <div className={cx('desc')}>

          </div>
          <div className={cx('desc')}>

          </div>
          <div className={cx('title')}>

          </div>
          <div className={cx('desc')}>

          </div>
          <div className={cx('desc')}>

          </div>
          <div className={cx('desc')}>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ChiTiet;
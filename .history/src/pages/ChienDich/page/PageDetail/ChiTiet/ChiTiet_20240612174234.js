import classNames from "classnames/bind";
import style from './ChiTiet.module.scss';

const cx = classNames.bind(style);

function ChiTiet() {
  return (  
    <div className={cx('ChiTiet')}>
      <div className={cx('row')}>
        <div className={cx('col-6', 'left')}>
          <div className={cx('title')}>
            
          </div>
        </div>
        <div className={cx('col-6', 'left')}>
          
        </div>
      </div>
    </div>
  );
}

export default ChiTiet;
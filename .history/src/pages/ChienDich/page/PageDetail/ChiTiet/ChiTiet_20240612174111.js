import classNames from "classnames/bind";
import style from './ChiTiet.module.scss';

const cx = classNames.bind(style);

function ChiTiet() {
  return (  
    <div className={cx('ChiTiet')}>
      <div className={cx('row')}>
        <div className={cx('col-6')}>

        </div>
      </div>
    </div>
  );
}

export default ChiTiet;
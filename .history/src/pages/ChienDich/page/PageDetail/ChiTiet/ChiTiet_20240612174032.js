import classNames from "classnames/bind";
import style from './ChiTiet.module.scss';

const cx = classNames.bind(style);

function ChiTiet() {
  return (  
    <div className={cx('ChiTiet')}>
      <div className={cx('row', 'left')}>

      </div>
    </div>
  );
}

export default ChiTiet;
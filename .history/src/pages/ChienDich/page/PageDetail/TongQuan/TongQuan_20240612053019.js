import classNames from "classnames/bind";
import style from './TongQuan.module.scss';

const cx = classNames.bind(style);

function TongQuan() {
  return (  
    <div className={cx('TongQuan')}>
      <div className={cx('left')}>
        <div className={cx('inner')}>
          <p className={cx('title')}></p>
          <p className={}></p>
        </div>
      </div>
      <div className={cx('right')}>
        <p>

        </p>
        <p>

        </p>
        <p>

        </p>
        <p>

        </p>
      </div>
    </div>
  );
}

export default TongQuan;
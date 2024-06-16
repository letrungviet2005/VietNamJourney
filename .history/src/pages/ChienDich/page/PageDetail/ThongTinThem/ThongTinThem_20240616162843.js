import classNames from "classnames/bind";
import style from './ThongTinThem.module.scss';

const cx = classNames.bind(style);

function ThongTinThem() {
  return (  
    <div className={cx('ThongTinThem')}>
      <div className={cx('contact')}>
        <hr />
        <div className={cx('title')}>
        <div className={cx('info')}>
          <div className={cx('item')}>
            <div className={cx('title')}></div>
          </div>
        </div>
        </div>
      </div>
      <div className={cx('organizations')}>
        <hr />
        <div className={cx('title')}>

        </div>
      </div>
    </div>
  );
}

export default ThongTinThem;
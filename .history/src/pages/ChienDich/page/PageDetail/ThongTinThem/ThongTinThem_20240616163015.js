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
            <p className={cx('desc')}></p>
            <p className={cx('title')}></p>
            <p className={cx('email')}><i class="fa-solid fa-envelope"></i> </p>
          </div>
          <div className={cx('item')}>
            <p className={cx('desc')}></p>
            <p className={cx('title')}></p>
            <p className={cx('email')}><i class="fa-solid fa-envelope"></i> </p>
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
import classNames from "classnames/bind";
import style from './ThongTinThem.module.scss';

const cx = classNames.bind(style);

function ThongTinThem() {
  return (  
    <div className={cx('ThongTinThem')}>
      <div className={cx('contact')}>
        <hr />
        <div>
          
        </div>
      </div>
      <div className={cx('organizations')}>
        <hr />
        <div>
          
        </div>
      </div>
    </div>
  );
}

export default ThongTinThem;
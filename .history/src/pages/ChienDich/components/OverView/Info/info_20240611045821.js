import classNames from "classnames/bind";
import style from './info.module.scss';

const cx = classNames.bind(style);

function Info({ className }) {
  return ( 
    <div className={className}>
      <div className={cx('info')}>
        <img src="https://toplist.vn/images/800px/cau-hien-luong-song-ben-hai-507421.jpg" alt="Ảnh"/>
        <div className={cx('title')}>
          Tổng quan - <span>Tỉnh Quảng Trị</span>
        </div>
        
      </div>
    </div>
   );
}

export default Info;
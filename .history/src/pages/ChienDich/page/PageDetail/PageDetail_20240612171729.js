import classNames from "classnames/bind";
import style from './PageDetail.module.scss';
import TongQuan from "./TongQuan/TongQuan";
import TacDong from "./TacDong/TacDong";

const cx = classNames.bind(style);

function PageDetail({imageUrl, campId, desc}) {
  const myStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu đen trong suốt với độ mờ 50%
    backgroundBlendMode: 'multiply', // Áp dụng chế độ kết hợp 'multiply' để làm cho ảnh nền bị tối đi
  };

  return (  
    <div className={cx('PageDetail')}>
      <div className={cx('header')} style={myStyle}>
        <p className={cx('title')}>Dự án & Chiến dịch</p>
        <p className={cx('camp-id')}>{campId}</p>
        <p className={cx('desc')}>{desc}</p>
      </div>
      <div className={cx('menu')}>
        <ul>
          <li className={cx('active')}>
            Tổng quan
          </li>
          <li>
            Tác động
          </li>
          <li>
            Chi tiết
          </li>
          <li>
            Thông tin thêm
          </li>
        </ul>
      </div>
      <TongQuan />
      <TacDong />
    </div>
  );
}

export default PageDetail;
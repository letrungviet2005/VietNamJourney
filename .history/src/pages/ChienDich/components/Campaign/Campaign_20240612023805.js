import classNames from "classnames/bind";
import style from './Campaign.module.scss';

const cx = classNames.bind(style);

function Campaign({ className, campId, campType, title, desc }) {
  const myStyle = {
    backgroundImage: "url('https://photo-cms-tpo.zadn.vn/Uploaded/2021/dr-ysleozyr/2021_04_23/image002-7267.jpeg')",
    backgroundSize: 'cover',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu đen trong suốt với độ mờ 50%
    backgroundBlendMode: 'multiply', // Áp dụng chế độ kết hợp 'multiply' để làm cho ảnh nền bị tối đi
  };

  return ( 
    <div className={className} style={{padding: '0px 35px'}}>
      <div className={cx('Campaign')} style={myStyle}>
        <div className={cx('camp-id')}>{campId}</div>
        <div className={cx('camp-type')}>{campType}</div>
        <h2 className={cx('title')}>{}</h2>
        <p className={cx('desc')}></p>
      </div>
    </div>
  );
}

export default Campaign;
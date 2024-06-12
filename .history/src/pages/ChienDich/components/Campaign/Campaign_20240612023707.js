import classNames from "classnames/bind";
import style from './Campaign.module.scss';

const cx = classNames.bind(style);

function Campaign({ className,  }) {
  const myStyle = {
    backgroundImage: "url('https://photo-cms-tpo.zadn.vn/Uploaded/2021/dr-ysleozyr/2021_04_23/image002-7267.jpeg')",
    backgroundSize: 'cover',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu đen trong suốt với độ mờ 50%
    backgroundBlendMode: 'multiply', // Áp dụng chế độ kết hợp 'multiply' để làm cho ảnh nền bị tối đi
  };

  return ( 
    <div className={className} style={{padding: '0px 35px'}}>
      <div className={cx('Campaign')} style={myStyle}>
        <div className={cx('camp-id')}>FP056</div>
        <div className={cx('camp-type')}>TÌNH NGUYỆN</div>
        <h2 className={cx('title')}>HUYỆN VĨNH LINH</h2>
        <p className={cx('desc')}>Phát động trồng 5000 cây xanh trong mùa hè 2024</p>
      </div>
    </div>
  );
}

export default Campaign;
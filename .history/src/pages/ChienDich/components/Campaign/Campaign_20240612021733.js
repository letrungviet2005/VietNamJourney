import classNames from "classnames/bind";
import style from './Campaign.module.scss';

const cx = classNames.bind(style);

function Campaign({ className }) {
  const myStyle = {
    backgroundImage: "url('https://photo-cms-tpo.zadn.vn/Uploaded/2021/dr-ysleozyr/2021_04_23/image002-7267.jpeg')",
    backgroundSize: 'cover',
  };

  return ( 
    <div className={className} style={{padding: '0px 35px'}}>
      <div className={cx('Campaign')} style={myStyle}>
        <div className={cx('camp-id')}>FP056</div>
        <div className={cx('camp-type')}>TÌNH NGUYỆN</div>
        <h2 className={cx('title')}>Huyện Vĩnh Linh</h2>
        <p className={cx('desc')}>Phá động trồng 5000 cây xanh trong mùa hè 2024</p>
      </div>
    </div>
  );
}

export default Campaign;
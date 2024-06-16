import classNames from "classnames/bind";
import style from './Campaign.module.scss';

const cx = classNames.bind(style);

function Campaign({ className, campId, campType, title, desc, imageUrl }) {
  // const myStyle = {
  //   backgroundImage: `url(${imageUrl})`,
  //   backgroundSize: 'cover',
  //   // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu đen trong suốt với độ mờ 50%
  //   backgroundBlendMode: 'multiply', // Áp dụng chế độ kết hợp 'multiply' để làm cho ảnh nền bị tối đi
  // };

  const [isHovered, setIsHovered] = useState(false);

  // Main container styles
  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: 'auto',
    aspectRatio: '1/1', // Ensures a square aspect ratio
    backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.5)',
    boxShadow: 'rgba(0, 0, 0, 0.7) 2px 10px 15px',
    overflow: 'hidden', // Prevents the background image from overflowing
    transition: 'background-color 1s', // Smooth transition for background color
  };

  // Background image styles using a pseudo-element approach
  const backgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transform: isHovered ? 'scale(1.2)' : 'scale(1)',
    transition: 'transform 1s ease', // Smooth transition for scaling
    zIndex: -1, // Ensures it's behind the content
  };

  return ( 
    <div className={className} style={{padding: '0px 35px'}}>
      {/* <div className={cx('Campaign')} style={myStyle}> */}
      <div className={cx('Campaign')} style={myStyle}>

        <div className={cx('camp-id')}>{campId}</div>
        <div className={cx('camp-type')}>{campType}</div>
        <h2 className={cx('title')}>{title}</h2>
        <p className={cx('desc')}>{desc}</p>
        <button className={cx('button')}>Chi tiết</button>
      </div>
    </div>
  );
}

export default Campaign;
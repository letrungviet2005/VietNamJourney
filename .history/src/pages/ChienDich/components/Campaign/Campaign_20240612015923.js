import classNames from "classnames/bind";
import style from './Campaign.module.scss';

const cx = classNames.bind(style);

function Campaign({ className }) {
  const myStyle = {
    backgroundImage: "url('https://photo-cms-tpo.zadn.vn/Uploaded/2021/dr-ysleozyr/2021_04_23/image002-7267.jpeg')",
    backgroundSize: 'cover',
  };

  return ( 
    <div className={className}>
      <div className={cx('Campaign')} style={myStyle}>
        <div className=()></div>
      </div>
    </div>
  );
}

export default Campaign;
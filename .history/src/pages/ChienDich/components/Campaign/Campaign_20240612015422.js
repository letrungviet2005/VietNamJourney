import classNames from "classnames/bind";
import style from './Campaign.module.scss';

const cx = classNames.bind(style);

function Campaign({ className }) {
  const myStyle = {
    backgroundImage: "url(https://www.thiennhien.net/wp-content/uploads/2014/04/030414_trongcay.jpg)",
    backgroundSize: 'cover',
  };

  return ( 
    <div className={className}>
      <div className={cx('Campaign')} style={myStyle}>
        
      </div>
    </div>
  );
}

export default Campaign;
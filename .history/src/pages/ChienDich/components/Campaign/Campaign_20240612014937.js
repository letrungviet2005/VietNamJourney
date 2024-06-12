import classNames from "classnames/bind";
import style from './Campaign.module.scss';

const cx = classNames.bind(style);

function Campaign({ className }) {
  const myStyle = {
    backgroundColor: "DodgerBlue",
  };

  return ( 
    <div className={className}>
      <div className={cx('Campaign')} style={{backgroundImage: 'url("")'}}>
        
      </div>
    </div>
  );
}

export default Campaign;
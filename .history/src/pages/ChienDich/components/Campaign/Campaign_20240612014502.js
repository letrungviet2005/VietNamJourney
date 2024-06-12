import classNames from "classnames/bind";
import style from './Campaign.module.scss';

const cx = classNames.bind(style);

function Campaign({ className }) {
  return ( 
    <div className={className}>
      <div className={cx('Campaign')} style={back}>
        
      </div>
    </div>
  );
}

export default Campaign;
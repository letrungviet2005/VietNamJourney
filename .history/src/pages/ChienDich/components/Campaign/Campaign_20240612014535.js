import classNames from "classnames/bind";
import style from './Campaign.module.scss';

const cx = classNames.bind(style);

function Campaign({ className }) {
  return ( 
    <div className={className}>
      <div className={cx('Campaign')} style={background-image: url("paper.gif");}>
        
      </div>
    </div>
  );
}

export default Campaign;
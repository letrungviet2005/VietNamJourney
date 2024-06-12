import classNames from "classnames/bind";
import style from './map.module.scss';

const cx = classNames.bind(style);

function Map({className}) {
  return (  
    <div className={className}>
      <div className={cx('map')}>
        
      </div>
    </div>
  );
}

export default Map;

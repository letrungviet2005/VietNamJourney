import classNames from "classnames/bind";
import style from './map.module.scss';

const cx = classNames.bind(style);

function Map({className}) {
  return (  
    <div className={className}>
      <div className={cx('map')}>
        <h2>Map</h2>
      </div>
    </div>
  );
}

export default Map;

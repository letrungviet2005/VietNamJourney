import classNames from "classnames/bind";
import style from './map.module.scss';

const cx = classNames.bind(style);

function Map({class}) {
  return (  
    <div className={cx('map')}>
      <h2>Map</h2>
    </div>
  );
}

export default Map;

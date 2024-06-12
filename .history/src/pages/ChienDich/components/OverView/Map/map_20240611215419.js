import classNames from "classnames/bind";
import style from './map.module.scss';
import MapVietNam from '../../../images/map.svg'

const cx = classNames.bind(style);

function Map({className}) {
  return (  
    <div className={className}>
      <div className={cx('map')}>
        <MapVietNam width=""/>
      </div>
    </div>
  );
}

export default Map;

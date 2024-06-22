import classNames from "classnames/bind";
import style from './OverView.module.scss';
import Map from './Map/map';
import Info from './Info/info';

const cx = classNames.bind(style);

function OverView({ province }) {
  return (  
    <div className={cx('overView')}>
      <div className={cx('row')}>
        <Map className={cx('col-xl-5', 'col-lg-5', 'col-md-5')} />
        <Info className={cx('col-7')} province={province}/>
      </div>
    </div>
  );
}

export default OverView;
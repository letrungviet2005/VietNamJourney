import classNames from "classnames/bind";
import style from './OverView.module.scss';
import Map from './Map/map';
import Info from './Info/info';

const cx = classNames.bind(style);

function OverView({ province }) {
  return (  
    <div className={cx('overView')}>
      <div className={cx('row', 'row-overView')}>
        <Map className={cx('col-xl-5', 'col-lg-5', 'col-md-10')} />
        <Info className={cx('col-xl-7', 'col-lg-7', 'col-md-10')} province={province}/>
      </div>
    </div>
  );
}

export default OverView;
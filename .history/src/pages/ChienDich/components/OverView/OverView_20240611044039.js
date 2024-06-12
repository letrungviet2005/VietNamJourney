import classNames from "classnames/bind";
import style from './OverView.module.scss';
import Map from './Map/map';
import Info from './Info/info';

const cx = classNames.bind(style);

function OverView() {
  return (  
    <div className={cx('row')}>
      <Map className={cx('col-5')}/>
      <Info className={cx('col-8')}/>
    </div>
  );
}

export default OverView;
import classNames from "classnames/bind";
import style from './OverView.moduile.scss';
import Map from './Map/map';
import Info from './Info/info';

const cx = classNames.bind(style);

function OverView() {
  return (  
    <div className={cx('row')}>
      <Map className={cx('col')}/>
      <Info className={cx('info')}/>
    </div>
  );
}

export default OverView;
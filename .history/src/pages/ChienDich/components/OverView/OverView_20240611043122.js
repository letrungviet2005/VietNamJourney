import classNames from "classnames/bind";
import style from './OverView.moduile.scss';
import Map from './Map/map';
import Info from './Info/info';

const cx = classNames.bind(style);

function OverView() {
  return (  
    <div className={cx('row')}>
      <p><Map className={cx('col-2')}/></p>
      <Info className={cx('col-5')}/>
    </div>
  );
}

export default OverView;
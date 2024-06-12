import classNames from "classnames/bind";
import style from './info.module.scss';

const cx = classNames.bind(style);

function Info() {
  return ( 
    <div className={cx('map')}>
      <h2>INFO</h2>
    </div>
   );
}

export default Info;
import classNames from "classnames/bind";
import style from './TacDong.module.scss';

const cx = classNames.bind(style);

function TacDong() {
  return (  
    <div className={cx('TacTong')}>
      <div className={cx('row')}>
        <div></div>
      </div>
    </div>
  );
}

export default TacDong;
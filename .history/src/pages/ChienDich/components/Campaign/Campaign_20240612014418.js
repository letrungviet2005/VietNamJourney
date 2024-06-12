import classNames from "classnames/bind";
import style from './Campaign.module.scss';

const cx = classNames.bind(style);

function Campaign({ className }) {
  return ( 
    <div className={className}>
      <div className={cx('Campaign')}>
        <img src="https://www.thiennhien.net/wp-content/uploads/2014/04/030414_trongcay.jpg" />
      </div>
    </div>
  );
}

export default Campaign;
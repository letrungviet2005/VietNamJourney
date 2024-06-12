import classNames from "classnames/bind";
import style from './Campaign.module.scss';

const cx = classNames.bind(style);

function Campaign({ className }) {
  return ( 
    <div className={className}>
      <div className={cx('Campaign')}>
        <h2>Chiến dịch</h2>
      </div>
    </div>
  );
}

export default Campaign;
import classNames from "classnames/bind";
import style from './info.module.scss';

const cx = classNames.bind(style);

function Info({ className }) {
  return ( 
    <div className={cx('info')}>
      <h2>INFO</h2>
    </div>
   );
}

export default Info;
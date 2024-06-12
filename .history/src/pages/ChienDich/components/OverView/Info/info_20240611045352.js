import classNames from "classnames/bind";
import style from './info.module.scss';

const cx = classNames.bind(style);

function Info({ className }) {
  return ( 
    <div className={className}>
      <div className={cx('info')}>
        <img src="" />
      </div>
    </div>
   );
}

export default Info;
import classNames from "classnames/bind";
import style from './Manager.module.scss';

const cx = classNames.bind(style);

function Manager() {
  return (  
    <div className={cx('Manager')}>
  );
}

export default Manager;

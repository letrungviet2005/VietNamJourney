import classNames from "classnames/bind";
import style from './OverView.module.scss';

const cx = classNames.bind(style);

function Campaign({ className }) {
  return ( 
    <div className={className}>
      <div className={cx('')}>

      </div>
    </div>
  );
}

export default Campaign;
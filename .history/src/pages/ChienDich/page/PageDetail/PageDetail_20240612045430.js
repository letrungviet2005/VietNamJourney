import classNames from "classnames/bind";
import style from './PageDetail.module.scss';

const cx = classNames.bind(style);

function PageDetail() {
  return (  
    <div className={cx('PageDetail')}>
      <div className={cx('header')}>
        <p className={cx('title')}></p>
        <p className={cx('camp-id')}></p>
        <p className={}></p>
      </div>
    </div>
  );
}

export default PageDetail;
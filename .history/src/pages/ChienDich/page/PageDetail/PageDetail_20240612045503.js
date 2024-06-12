import classNames from "classnames/bind";
import style from './PageDetail.module.scss';

const cx = classNames.bind(style);

function PageDetail() {
  return (  
    <div className={cx('PageDetail')}>
      <div className={cx('header')}>
        <p className={cx('title')}>Dự án & Chiến dịch</p>
        <p className={cx('camp-id')}>FP095</p>
        <p className={cx('desc')}></p>
      </div>
    </div>
  );
}

export default PageDetail;
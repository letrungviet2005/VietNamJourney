import classNames from "classnames/bind";
import style from './Contact.module.scss';

const cx = classNames.bind(style);

function Contact() {
  return (  
    <div className={cx('contact')}>
      <h2 className={cx('title')}>Cơ quan phối hợp hỗ trợ</h2>
      <div className={cx('row')}>
        <div className={cx('col-4')}>
          <img src=""/>
          <p>Đoàn TNCS Hồ Chí Minh Quảng Trị</p>
        </div>
        <div className={cx('col-4')}>
          <img src=""/>
          <p>Sở Tài Nguyên và Môi Trường Quảng Trị</p>
        </div>
        <div className={cx('col-4')}>
          <img src=""/>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
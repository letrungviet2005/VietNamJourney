import classNames from "classnames/bind";
import style from './Contact.module.scss';

const cx = classNames.bind(style);

function Contact() {
  return (  
    <div className={cx('contact')}>
      <h2 className={cx('title')}>Cơ quan phối hợp hỗ trợ</h2>
      <div className={cx('row')}>
        <div className={cx('col-4')}>
          <img src="https://rubee.com.vn/wp-content/uploads/2021/05/logo-doan-4.png"/>
          <p>Đoàn TNCS Hồ Chí Minh Quảng Trị</p>
        </div>
        <div className={cx('col-4')}>
          <img src="https://tnmttravinh.gov.vn/img/logo.png"/>
          <p>Sở Tài Nguyên và Môi Trường Quảng Trị</p>
        </div>
        <div className={cx('col-4')}>
          <img src="http://huib.hueuni.edu.vn/wp-content/uploads/2020/12/logo.-khong-chu.-khong-layer.-600.png"/>
          <p>Viện Công Nghệ sinh học, ĐH Huế</p>
        </div>
      </div>
      <h2 className={cx('title')}>Liên hệ với chúng tôi</h2>
      <div className={cx('row')}>
        <div className={cx('col-4')}>
          <img src="https://rubee.com.vn/wp-content/uploads/2021/05/logo-doan-4.png"/>
          <div className={cx('name')}></div>
          <
        </div>
      </div>
    </div>
  );
}

export default Contact;
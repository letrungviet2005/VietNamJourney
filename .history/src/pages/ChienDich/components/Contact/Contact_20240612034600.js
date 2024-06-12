import classNames from "classnames/bind";
import style from './Contact.module.scss';

const cx = classNames.bind(style);

function Contact() {
  return (  
    <div className={cx('contact')}>
      <h2 className={cx('title')}>Cơ quan phối hợp hỗ trợ</h2>
      <div className={cx('row')}>
        <div className={cx('col-4')}>
          <img src="https://tse3.mm.bing.net/th?id=OIP.dU_4ptPPSPRvLfCml2KGfgAAAA&pid=Api&P=0&h=220"/>
          <p>Đoàn TNCS Hồ Chí Minh Quảng Trị</p>
        </div>
        <div className={cx('col-4')}>
          <img src="https://tnmttravinh.gov.vn/img/logo.png"/>
          <p>Sở Tài Nguyên và Môi Trường Quảng Trị</p>
        </div>
        <div className={cx('col-4')}>
          <img src=""/>
          <p>Viện Công Nghệ sinh học, ĐH Huế</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import header2 from '../../Images/Logos/header2.png';

const cx = classNames.bind(styles);

function Footer() {
  return (
    <footer className={cx('footer')}>
      <div className={cx('footer-container')}>
        <div className={cx('footer-section', 'footer-logo')}>
          <img src={header2} alt="Logo" />
          <p>Vì một môi trường xanh-sạch-đẹp<br />Hãy chung tay bảo vệ môi trường</p>
        </div>
        <div className={cx('footer-section', 'footer-links')}>
          <h3>Liên kết</h3>
          <ul>
            <li><Link to="/TrangChu">Trang Chủ</Link></li>
            <li><Link to="/CongDong">Cộng Đồng</Link></li>
            <li><Link to="/ChienDich">Chiến Dịch</Link></li>
            <li><Link to="/QuyenGop">Quyên Góp</Link></li>
            <li><Link to="/TaiKhoan">Tài Khoản</Link></li>
          </ul>
        </div>
        <div className={cx('footer-section', 'footer-contact')}>
          <h3>Liên hệ</h3>
          <p>Email: viethan@vku.udn.vn</p>
          <p>SĐT: 0979727604</p>
          <p>Địa chỉ: Trần Đại Nghĩa, Ngũ Hành Sơn, Đà Nẵng</p>
        </div>
        <div className={cx('footer-section', 'footer-newsletter')}>
          <h3>Theo dõi bản tin từ chúng tôi</h3>
          <form action="#" method="post" className={cx('newsletter-form')}>
            <input type="email" name="email" placeholder="Enter your email" required />
            <button type="submit">Đăng ký</button>
          </form>
          <ul>
            <li><a href="#"><i className="fa-brands fa-google-plus-g"></i></a>Google</li>
            <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a>Facebook</li>
            <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a>Linkedin</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

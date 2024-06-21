import classNames from 'classnames/bind';
import style from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { getCookie, useCheckCookie } from '../../Cookie/getCookie';
const cx = classNames.bind(style);

function Footer() {
  return (  
    <div className={cx('footer')}>
        <div className={cx('footer-container')}>
            <div className={cx('footer-row')}>
                <div className={cx('footer-col')}>
                    <div className={cx('footer-col-header')}>Liên hệ</div>
                    <ul className={cx('footer-ul')}>
                        <li className={cx('footer-li')}>
                            <Link to="/" className={cx('footer-link')}>Trang chủ</Link>
                        </li>
                        <li className={cx('footer-li')}>
                            <Link to="/gioi-thieu" className={cx('footer-link')}>Giới thiệu</Link>
                        </li>
                        <li className={cx('footer-li')}>
                            <Link to="/lien-he" className={cx('footer-link')}>Liên hệ</Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('footer-col')}>
                    <div className={cx('footer-col-header')}>Hỗ trợ</div>
                    <ul className={cx('footer-ul')}>
                        <li className={cx('footer-li')}>  
                            <Link to="/chinh-sach-bao-mat" className={cx('footer-link')}>Chính sách bảo mật</Link>
                        </li>     
                    </ul>
                </div>
                <div className={cx('footer-col')}>
                    <div className={cx('footer-col-header')}>Về chúng tôi</div>
                    <ul className={cx('footer-ul')}>
                        <li className={cx('footer-li')}>
                            <Link to="/chien-dich" className={cx('footer-link')}>Chien dich</Link>
                        </li>
                        <li className={cx('footer-li')}>
                            <Link to="/tai-khoan" className={cx('footer-link')}>Tài khoản</Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('footer-col')}>
                    <div className={cx('footer-col-header')}>Địa điểm</div>
                    <ul className={cx('footer-ul')}>
  );
}

export default Footer;
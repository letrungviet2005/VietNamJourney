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
  );
}

export default Footer;
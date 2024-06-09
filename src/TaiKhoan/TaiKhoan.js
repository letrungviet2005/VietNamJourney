import React, { useState } from 'react';
import styles from './TaiKhoan.module.css';
import background from '../Images/TaiKhoan/background_taikhoan.jpg';

function TaiKhoan() {
  const [active, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!active);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("Đăng nhập");
  };

  const handleRegister = (event) => {
    event.preventDefault();
    console.log("Đăng ký");
  };


  return (
      <div className={styles.box}>
      <div className={`${styles.container} ${active ? styles.active : ''}`}>
        <div className={`${styles['form-container']} ${styles['sign-up']}`}>
          <form>
            <h1>ĐĂNG KÝ</h1>
            <div className={styles['social-icons']}>
              <a href="#" className={styles.icon}><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className={styles.icon}><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className={styles.icon}><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className={styles.icon}><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>hoặc sử dụng email của bạn để đăng ký</span>
            <input type="text" placeholder="Email" />
            <input type="email" placeholder="Mật Khẩu" />
            <input type="password" placeholder="Xác thực mật khẩu" />
            <button onClick={handleRegister}>ĐĂNG KÝ</button>
          </form>
        </div>
        <div className={`${styles['form-container']} ${styles['sign-in']}`}>
          <form>
            <h1>ĐĂNG NHẬP</h1>
            <div className={styles['social-icons']}>
              <a href="#" className={styles.icon}><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className={styles.icon}><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className={styles.icon}><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className={styles.icon}><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>hoặc sử dụng mật khẩu gmail của bạn</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Mật khẩu" />
            <a href="#">Quên mật khẩu?</a>
            <button onClick={handleLogin}>ĐĂNG NHẬP</button>
          </form>
        </div>
        <div className={styles['toggle-container']}>
          <div className={styles.toggle}>
            <div className={`${styles['toggle-panel']} ${styles['toggle-left']}`}>
              <h1>CHÀO MỪNG BẠN QUAY TRỞ LẠI!</h1>
              <p>Nếu bạn đã có tài khoản vui lòng nhấn vào đăng nhập</p>
              <button className={styles.hidden} id="login" onClick={toggleClass}>ĐĂNG NHẬP</button>
            </div>
            <div className={`${styles['toggle-panel']} ${styles['toggle-right']}`}>
              <h1>CHÀO BẠN</h1>
              <p>Nếu bạn chưa có tài khoản vui lòng nhấn vào đây để đăng ký</p>
              <button className={styles.hidden} id="register" onClick={toggleClass}>ĐĂNG KÝ</button>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
}

export default TaiKhoan;
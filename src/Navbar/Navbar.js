// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; // Import CSS module
import header1 from '../Images/header1.png';
import header2 from '../Images/header2.png';

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className={styles.header}> 
      <div className={styles.logo}> 
        <Link to="/intro">
          <img
            className={styles.logo1} 
            src={header1}
            alt="Logo 1"
            style={{ height: '40px', cursor: 'pointer' }}
          />
          <img
            className={styles.logo2} 
            src={header2}
            alt="Logo 2"
            style={{ cursor: 'pointer' }}
          />
        </Link>
      </div>

      <div className={styles.links}> 
        <nav>
          <Link to="/TrangChu">TRANG CHỦ</Link>
          <Link to="/CongDong">CỘNG ĐỒNG</Link>
          <Link to="/ChienDich">CHIẾN DỊCH</Link>
          <Link to="/Quy">QUỸ</Link>
          <Link to="/TaiKhoan">TÀI KHOẢN  <i className="fa-solid fa-user"></i></Link>
        </nav>
      </div>

      <div className={styles.bar} onClick={toggleSidebar}>
        <i className="fa-solid fa-bars"></i>
      </div>

      <div className={`${styles.overlay} ${isSidebarOpen ? styles.active : ''}`} onClick={toggleSidebar}></div> 
      
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}> 
        <div className={styles['sidebar-content']}> 
          <div
            style={{ color: 'aliceblue', textAlign: 'right', marginTop: 0, cursor: 'pointer' }}
            onClick={toggleSidebar}
          >
            <i className="fa-solid fa-bars"></i>
          </div>
          <div className={styles['list-navbar']}> 
            <Link to="/TrangChu" onClick={toggleSidebar}>
              TRANG CHỦ <i className="fa-solid fa-house"></i>
            </Link>
            <Link to="/CongDong" onClick={toggleSidebar}>
              CỘNG ĐỒNG <i className="fa-solid fa-earth-americas"></i>
            </Link>
            <Link to="/ChienDich" onClick={toggleSidebar}>
              CHIẾN DỊCH <i className="fa-solid fa-fire"></i>
            </Link>
            <Link to="/Quy" onClick={toggleSidebar}>
              QUỸ <i className="fa-solid fa-hand-holding-dollar"></i>
            </Link>
            <Link to="/TaiKhoan" onClick={toggleSidebar}>
              TÀI KHOẢN <i className="fa-solid fa-user"></i>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
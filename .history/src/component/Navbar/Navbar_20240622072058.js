import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Navbar.module.css'; // Import CSS module
import header1 from '../../Images/Logos/header1.png';
import header2 from '../../Images/Logos/header2.png';
import { getCookie, useCheckCookie } from '../../Cookie/getCookie';

const cx = classNames.bind(styles);

function Navbar() {
  const userName = useCheckCookie('UserName', null); // Kiểm tra cookie `User_Name`
  const [link, setLink] = useState('/TaiKhoan');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (userName) {
      setLink('/User?user_id=' + getCookie('User_ID')); // Cập nhật link khi có `User_Name`
    } else {
      setLink('/TaiKhoan'); // Link mặc định nếu chưa đăng nhập
    }
  }, [userName]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const deleteCookie = (cookieName) => {
    const expireDate = new Date();
    expireDate.setTime(expireDate.getTime() - 1);
    document.cookie = `${cookieName}=; expires=${expireDate.toUTCString()}; path=/`;
  };

  const handleDeleteCookie = () => {
    deleteCookie('User_ID');
    deleteCookie('UserName');
    setIsDropdownOpen(false);
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

          {userName ? (
            <div className={cx('nav-item', { open: isDropdownOpen })}>
              <span className={cx('dropdown-toggle')} onClick={toggleDropdown}>
                <i className="fa-solid fa-circle-user" style={{ marginRight :'0.3rem',fontSize : '1.4rem' }}></i>{userName} <i className="fa-solid fa-caret-down"></i>
              </span>
              <div className={cx('dropdown-menu')}>
                <Link className={cx('dropdown-item')} to={"/User?user_id=" + getCookie('User_ID')} onClick={closeDropdown}>
                  Thông tin cá nhân
                </Link>
                {/* <Link className={cx('dropdown-item')} to="/Manager" onClick={closeDropdown}>
                  Chiến dịch của tôi
                </Link> */}
                <Link className={cx('dropdown-item')} to="/CampaignJoined" onClick={closeDropdown}>
                  Chiến dịch đã tham gia
                </Link>
                <div className={cx('dropdown-divider')}></div>
                <Link className={cx('dropdown-item')} to="/TaiKhoan" onClick={handleDeleteCookie}>
                  Đăng xuất
                </Link>
              </div>
            </div>
          ) : (
            <Link to={link}>
              ĐĂNG NHẬP <i className="fa-solid fa-user"></i>
            </Link>
          )}
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
            {userName ? (
              <div style={{ display : 'flex' , flexDirection : 'column' }} >
                  <Link to={"/User?user_id=" + getCookie('User_ID')} onClick={toggleSidebar}>
                    {userName}  <i className="fa-solid fa-circle-user"></i>
                  </Link>
                  <Link to="/Manager" onClick={toggleSidebar}>
                    CHIẾN DỊCH CỦA TÔI
                  </Link>
                  <Link to="/CampaignJoined" onClick={toggleSidebar}>
                    CHIẾN DỊCH THAM GIA
                  </Link>
                  <Link to="/TaiKhoan" onClick={handleDeleteCookie && toggleSidebar}>
                    ĐĂNG XUẤT <i class="fa-solid fa-arrow-right-from-bracket"></i>
                  </Link>
              </div>
            ) : (
              <Link to={link} onClick={toggleSidebar}>
                ĐĂNG NHẬP <i className="fa-solid fa-user"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
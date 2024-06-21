// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import styles from './Navbar.module.css'; // Import CSS module
// import header1 from '../../Images/Logos/header1.png';
// import header2 from '../../Images/Logos/header2.png';
// import { getCookie, useCheckCookie } from '../../Cookie/getCookie';

// function Navbar() {
//   const getUserLink = () => {
//     const cookies = document.cookie;
//     const cookiesArray = cookies.split('; ');
//     const userIdCookie = cookiesArray.find(cookie => cookie.startsWith('User_ID='));
//     const userId = userIdCookie ? userIdCookie.split('=')[1] : null;
//     return userId ? `/User?user_id=${userId}` : "/TaiKhoan";
//   };

//   const [link, setLink] = useState(getUserLink());
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   useEffect(() => {
//     const handleCookieChange = () => {
//       setLink(getUserLink());
//     };

//     window.addEventListener('cookiechange', handleCookieChange);

//     return () => {
//       window.removeEventListener('cookiechange', handleCookieChange);
//     };
//   }, []);

//   return (
//     <header className={styles.header}>
//       <div className={styles.logo}>
//         <Link to="/intro">
//           <img
//             className={styles.logo1}
//             src={header1}
//             alt="Logo 1"
//             style={{ height: '40px', cursor: 'pointer' }}
//           />
//           <img
//             className={styles.logo2}
//             src={header2}
//             alt="Logo 2"
//             style={{ cursor: 'pointer' }}
//           />
//         </Link>
//       </div>

//       <div className={styles.links}>
//         <nav>
//           <Link to="/TrangChu">TRANG CHỦ</Link>
//           <Link to="/CongDong">CỘNG ĐỒNG</Link>
//           <Link to="/ChienDich">CHIẾN DỊCH</Link>
//           <Link to="/Quy">QUỸ</Link>
//           <Link to={link}>ĐĂNG NHẬP</Link>
//         </nav>
//       </div>

//       <div className={styles.bar} onClick={toggleSidebar}>
//         <i className="fa-solid fa-bars"></i>
//       </div>

//       <div className={`${styles.overlay} ${isSidebarOpen ? styles.active : ''}`} onClick={toggleSidebar}></div>

//       <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
//         <div className={styles['sidebar-content']}>
//           <div
//             style={{ color: 'aliceblue', textAlign: 'right', marginTop: 0, cursor: 'pointer' }}
//             onClick={toggleSidebar}
//           >
//             <i className="fa-solid fa-bars"></i>
//           </div>
//           <div className={styles['list-navbar']}>
//             <Link to="/TrangChu" onClick={toggleSidebar}>
//               TRANG CHỦ <i className="fa-solid fa-house"></i>
//             </Link>
//             <Link to="/CongDong" onClick={toggleSidebar}>
//               CỘNG ĐỒNG <i className="fa-solid fa-earth-americas"></i>
//             </Link>
//             <Link to="/ChienDich" onClick={toggleSidebar}>
//               CHIẾN DỊCH <i className="fa-solid fa-fire"></i>
//             </Link>
//             <Link to="/Quy" onClick={toggleSidebar}>
//               QUỸ <i className="fa-solid fa-hand-holding-dollar"></i>
//             </Link>
//             <Link to={link} onClick={toggleSidebar}>
//               ĐĂNG NHẬP <i className="fa-solid fa-user"></i>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Navbar;







import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Navbar.module.css'; // Import CSS module
import header1 from '../../Images/Logos/header1.png';
import header2 from '../../Images/Logos/header2.png';
import { getCookie,useCheckCookie } from '../../Cookie/getCookie';

const cx = classNames.bind(styles);

function Navbar() {
  const userName = useCheckCookie('UserName', null); // Kiểm tra cookie `User_Name`

  const [link, setLink] = useState('/TaiKhoan');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                {userName} {/* Hiển thị tên người dùng */}
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/Profile">Thông tin cá nhân</Link>
                <Link className="dropdown-item" to="/Settings">Cài đặt</Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="/Logout">Đăng xuất</Link>
              </div>
            </li>
          ) : (
            <Link to={link}>ĐĂNG NHẬP</Link>
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
              <li className="nav-item dropdown show">
                <a className="nav-link dropdown-toggle" href="#" onClick={toggleSidebar} aria-expanded="false">
                  {userName} <i className="fa-solid fa-user"></i> {/* Hiển thị tên người dùng */}
                </a>
                <div className="dropdown-menu show">
                  <Link className="dropdown-item" to="/Profile" onClick={toggleSidebar}>
                    Thông tin cá nhân
                  </Link>
                  <Link className="dropdown-item" to="/Settings" onClick={toggleSidebar}>
                    Cài đặt
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="/Logout" onClick={toggleSidebar}>
                    Đăng xuất
                  </Link>
                </div>
              </li>
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


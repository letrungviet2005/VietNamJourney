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
import styles from './Navbar.module.css'; // Import CSS module
import header1 from '../../Images/Logos/header1.png';
import header2 from '../../Images/Logos/header2.png';
import { useCheckCookie } from '../../Cookie/getCookie';

function Navbar() {
  const user = useCheckCookie('User_Name', '/TaiKhoan'); // Kiểm tra cookie `User_Name`
  const [link, setLink] = useState('/TaiKhoan');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setLink('/User?user_id=' + getCookie('User_ID')); // Lấy User_ID từ cookie
    } else {
      setLink('/TaiKhoan');
    }
  }, [user]);

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
          <Link to={link}>
            {user ? user : 'ĐĂNG NHẬP'} {/* Hiển thị tên người dùng hoặc 'ĐĂNG NHẬP' */}
          </Link>
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
            <Link to={link} onClick={toggleSidebar}>
              {user ? user : 'ĐĂNG NHẬP'} <i className="fa-solid fa-user"></i> {/* Hiển thị tên người dùng hoặc 'ĐĂNG NHẬP' */}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Navbar.module.css";
import header1 from "../../Images/Logos/header1.png";
import header2 from "../../Images/Logos/header2.png";
import { getCookie } from "../../Cookie/getCookie";

const cx = classNames.bind(styles);

function Navbar() {
  const [link, setLink] = useState("/TaiKhoan");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const userId = getCookie("User_ID");
    if (userId) {
      setLink("/User?user_id=" + userId);

      fetch("http://localhost:8000/api/getInformationNavBar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ User_ID: userId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setUserInfo(data.user);
          } else {
            console.error("Failed to fetch user information");
          }
        })
        .catch((error) => console.error("Error:", error));
    } else {
      setLink("/TaiKhoan");
    }
  }, []);

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
    deleteCookie("User_ID");
    deleteCookie("UserName");
    setIsDropdownOpen(false);
    setUserInfo(null);
  };

  const managerLink =
    userInfo && userInfo.check === 1 ? "/Manager" : "/Professional";

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img
            className={styles.logo1}
            src={header1}
            alt="Logo 1"
            style={{ height: "40px", cursor: "pointer" }}
          />
          <img
            className={styles.logo2}
            src={header2}
            alt="Logo 2"
            style={{ cursor: "pointer" }}
          />
        </Link>
      </div>

      <div className={styles.links}>
        <nav>
          <Link to="/TrangChu">TRANG CHỦ</Link>
          <Link to="/CongDong">CỘNG ĐỒNG</Link>
          <Link to="/ChienDich">CHIẾN DỊCH</Link>
          <Link to="/Quy">QUỸ</Link>
          {userInfo && <Link to="/Messenger?type=user&user_id=0">TRÒ CHUYỆN </Link>}

          {userInfo ? (
            <div className={cx("nav-item", { open: isDropdownOpen })}>
              <span className={cx("dropdown-toggle")} onClick={toggleDropdown}>
                <img
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    marginRight: "5px",
                  }}
                  src={userInfo.Image}
                  alt="Avatar"
                />
                {userInfo.Name}
              </span>
              <div className={cx("dropdown-menu")}>
                <Link
                  className={cx("dropdown-item")}
                  to={"/User?user_id=" + getCookie("User_ID")}
                  onClick={closeDropdown}
                >
                  Trang cá nhân
                </Link>
                <Link
                  className={cx("dropdown-item")}
                  to={managerLink}
                  onClick={closeDropdown}
                >
                  Chiến dịch của tôi
                </Link>
                <div className={cx("dropdown-divider")}></div>
                <Link
                  className={cx("dropdown-item")}
                  to="/TaiKhoan"
                  onClick={handleDeleteCookie}
                >
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

      <div
        className={`${styles.overlay} ${isSidebarOpen ? styles.active : ""}`}
        onClick={toggleSidebar}
      ></div>

      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
        <div className={styles["sidebar-content"]}>
          <div
            style={{
              color: "aliceblue",
              textAlign: "right",
              marginTop: 0,
              cursor: "pointer",
            }}
            onClick={toggleSidebar}
          >
            <i className="fa-solid fa-bars"></i>
          </div>
          <div className={styles["list-navbar"]}>
            {userInfo && (
              <Link
                to={"/User?user_id=" + getCookie("User_ID")}
                onClick={toggleSidebar}
              >
                {userInfo.Name} <i className="fa-solid fa-circle-user"></i>
              </Link>
            )}
            {userInfo && (
              <Link to="/Messenger?type=user&user_id=0" onClick={toggleSidebar}>
                NHẮN TIN <i className="fa-solid fa-envelope"></i>
              </Link>
            )}
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
            {userInfo ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Link to={managerLink} onClick={toggleSidebar}>
                  CHIẾN DỊCH CỦA TÔI
                </Link>
                <Link
                  to="/TaiKhoan"
                  onClick={() => {
                    handleDeleteCookie();
                    toggleSidebar();
                  }}
                >
                  ĐĂNG XUẤT{" "}
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
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

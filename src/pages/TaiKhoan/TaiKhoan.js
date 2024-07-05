import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './TaiKhoan.module.css';
import background1 from '../../Images/TaiKhoan/phong.jpg';
import Cookies from 'js-cookie';

function TaiKhoan() {
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const navigate = useNavigate();  

  const toggleClass = () => {
    setActive(!active);
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    // Reset lỗi
    setEmailError('');
    setPasswordError('');

    let hasError = false;

    if (!email) {
        setEmailError('Vui lòng nhập vào trường này');
        hasError = true;
    }

    if (!password) {
        setPasswordError('Vui lòng nhập vào trường này');
        hasError = true;
    }

    if (hasError) {
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: email, password: password }),
        });
        const data = await response.json();
        if (data.error) {
            // Kiểm tra nếu error là một object, thì chuyển thành string
            setErrorMessage(typeof data.error === 'object' ? JSON.stringify(data.error) : data.error);
            setEmailError(''); 
            setPasswordError(''); 
        } else {
            setErrorMessage('');
            console.log("Đăng nhập thành công", data.user);
            const userID = data.user.UserLogin_ID;
            const userName = data.user.Username;
            Cookies.set('User_ID', userID, { expires: 30 });
            Cookies.set('UserName', userName, { expires: 30 });
            navigate('/TrangChu'); 
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

 const handleRegister = async (event) => {
    event.preventDefault();

    // Reset lỗi
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setUsernameError('');

    let hasError = false;

    if (!email) {
        setEmailError('Vui lòng nhập vào trường này');
        hasError = true;
    } else if (!validateEmail(email)) {
        setEmailError('Email không hợp lệ');
        hasError = true;
    }

    if (!username) {
        setUsernameError('Vui lòng nhập vào trường này');
        hasError = true;
    }

    if (!password) {
        setPasswordError('Vui lòng nhập vào trường này');
        hasError = true;
    } else if (password.length < 6) {
        setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
        hasError = true;
    }

    if (password !== confirmPassword) {
        setConfirmPasswordError('Mật khẩu xác thực không khớp');
        hasError = true;
    }

    if (hasError) {
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password }),
        });
        const data = await response.json();
        if (data.error) {
            // Kiểm tra nếu error là một object, thì chuyển thành string
            setErrorMessage(typeof data.error === 'object' ? JSON.stringify(data.error) : data.error);
        } else {
            setErrorMessage('');
            console.log("Đăng ký thành công", data.user);
            const userID = data.user.UserLogin_ID;
            const userName = data.user.Username;
            Cookies.set('User_ID', userID, { expires: 30 });
            Cookies.set('UserName', userName, { expires: 30 });
            navigate('/TrangChu'); 
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

  return (
    <div className={styles.box} style={{ backgroundImage: `url(${background1})` }}>
      <div className={`${styles.container} ${active ? styles.active : ''}`}>
        <div className={`${styles['form-container']} ${styles['sign-up']}`}>
          <form>
            <h1>ĐĂNG KÝ</h1>
            <div className={styles['social-icons']}>
              <a href="#" className={styles.icon}><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className={styles.icon}><i className="fa-brands fa-facebook-f"></i></a>
            </div>
            <span>hoặc sử dụng email của bạn để đăng ký</span>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={emailError ? styles.inputError : ''}
            />
            {emailError && <h6 className={styles.errorMessage}>{emailError}</h6>}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={usernameError ? styles.inputError : ''}
            />
            {usernameError && <h6 className={styles.errorMessage}>{usernameError}</h6>}
            <input
              type="password"
              placeholder="Mật Khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={passwordError ? styles.inputError : ''}
            />
            {passwordError && <h6 className={styles.errorMessage}>{passwordError}</h6>}
            <input
              type="password"
              placeholder="Xác thực mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={confirmPasswordError ? styles.inputError : ''}
            />
            {confirmPasswordError && <h6 className={styles.errorMessage}>{confirmPasswordError}</h6>}
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            <button onClick={handleRegister}>ĐĂNG KÝ</button>
          </form>
        </div>
        <div className={`${styles['form-container']} ${styles['sign-in']}`}>
          <form>
            <h1>ĐĂNG NHẬP</h1>
            <div className={styles['social-icons']}>
              <a href="#" className={styles.icon}><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className={styles.icon}><i className="fa-brands fa-facebook-f"></i></a>
            </div>
            <span>hoặc sử dụng mật khẩu gmail của bạn</span>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={emailError ? styles.inputError : ''}
            />
            {emailError && <h6 className={styles.errorMessage}>{emailError}</h6>}
            <input
              id="password"
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={passwordError ? styles.inputError : ''}
            />
            {passwordError && <h6 className={styles.errorMessage}>{passwordError}</h6>}
            <a href="#">Quên mật khẩu?</a>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            <button onClick={handleLogin}>ĐĂNG NHẬP</button>
          </form>
        </div>
        <div className={styles['toggle-container']}>
          <div className={styles.toggle} style={{ backgroundImage: `url(${background1})` }}>
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
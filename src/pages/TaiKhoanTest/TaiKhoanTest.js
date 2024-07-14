import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './TaiKhoanTest.module.css';
import background1 from '../../Images/TaiKhoan/phong.jpg';
import Cookies from 'js-cookie';

const TaiKhoanTest = () => {
  const [isActive, setIsActive] = useState(false);
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

  useEffect(() => {
    // Check if User_ID cookie exists
    const userID = Cookies.get('User_ID');
    if (userID) {
      navigate('/TrangChu');
    }
  }, []); // Empty dependency array ensures this effect runs only once

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async (event) => {
    event.preventDefault();

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
            setErrorMessage("Username hoặc mật khẩu không hợp lệ");
            console.error("Username hoặc mật khẩu không hợp lệ");
        } else {
            setErrorMessage('');
            console.log("Đăng nhập thành công", data.user);
            const userID = data.user.UserLogin_ID;
            const userName = data.user.Username;
            Cookies.set('User_ID', userID, { expires: 30 });
            Cookies.set('UserName', userName, { expires: 30 });
            navigate('/TrangChu'); // Navigate tới /TrangChu sau khi đăng nhập thành công
            window.location.reload(); // Reload trang sau khi đăng nhập thành công
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

 const handleRegister = async (event) => {
    event.preventDefault();

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
        console.log(data);
        if (data.error) {
            console.log("Username đã tồn tại");
            setUsernameError("Username đã tồn tại");
        } else {
            setErrorMessage('');
            console.log("Đăng ký thành công", data.user);
            const userID = data.user.UserLogin_ID;
            const userName = data.user.Username;
            Cookies.set('User_ID', userID, { expires: 30 });
            Cookies.set('UserName', userName, { expires: 30 });
            navigate('/TrangChu'); // Navigate tới /TrangChu sau khi đăng ký thành công
            window.location.reload(); // Reload trang sau khi đăng ký thành công
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

  return (
    <div className={styles.background} style={{ backgroundImage: `url(${background1})` }}>
      <div className={styles.container}>
        <div className={styles.item}>
          <h1 className={styles.logo}>Viet<span style={{ color: '#18dc18' }}>Nam</span> J<span style={{ color: '#18dc18' }}>our</span>ney</h1>
          <div className={styles.textItem}>
            <h3>Chào mừng <br /><span>Đến Với VietNam Journey</span></h3>
            <p>Góp phần tạo nên cuộc sống của bạn...</p>
          </div>
        </div>
        <div className={`${styles.loginSection} ${isActive ? styles.active : ''}`}>
          <div className={`${styles.formBox} ${styles.login}`}>
            <form onSubmit={handleLogin}>
              <h2>Đăng nhập</h2>
              <div className={styles.inputBox}>
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={emailError ? styles.inputError : ''}
                  required 
                />
                <label>Username</label>
                {emailError && <h6 className={styles.errorMessage}>{emailError}</h6>}
              </div>
              <div className={styles.inputBox}>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <label>Password</label>
                {errorMessage && <h6 className={styles.errorMessage}>{errorMessage}</h6>}
              </div>
              
              <button type="submit" className={styles.btn}>Đăng nhập</button>
              <div className={styles.createAccount}>
                <p>Tạo tài khoản mới? <a className={styles.registerLink} onClick={handleRegisterClick} style={{ cursor: 'pointer' } }>Tạo tài khoản</a></p>
              </div>
            </form>
          </div>
          <div className={`${styles.formBox} ${styles.register}`}>
            <form onSubmit={handleRegister}>
              <h2>Đăng ký</h2>
              <div className={styles.inputBox}>
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={emailError ? styles.inputError : ''}
                  required 
                />
                <label>Email</label>
                {emailError && <h6 className={styles.errorMessage}>{emailError}</h6>}
              </div>
              <div className={styles.inputBox}>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={usernameError ? styles.inputError : ''}
                  required 
                />
                <label>Username</label>
                {usernameError && <h6 className={styles.errorMessage}>{usernameError}</h6>}
              </div>
              <div className={styles.inputBox}>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={passwordError ? styles.inputError : ''}
                  required 
                />
                <label>Password</label>
                {passwordError && <h6 className={styles.errorMessage}>{passwordError}</h6>}
              </div>
              <div className={styles.inputBox}>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={confirmPasswordError ? styles.inputError : ''}
                  required 
                />
                <label>Confirm Password</label>
                {confirmPasswordError && <h6 className={styles.errorMessage}>{confirmPasswordError}</h6>}
              </div>
              <button type="submit" className={styles.btn}>Đăng ký</button>
              <div className={styles.createAccount}>
                <p>Bạn đã có tài khoản? <a className={styles.loginLink} onClick={handleLoginClick} style={{ cursor: 'pointer' }} >Đăng nhập</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaiKhoanTest;
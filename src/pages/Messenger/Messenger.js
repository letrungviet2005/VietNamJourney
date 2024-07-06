import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Messenger.css';
import MessengerUser from './MessengerUser/MessengerUser';
import MessengerGroup from './MessengerGroup/MessengerGroup';

function Messenger() {
    const cookies = document.cookie;
    const cookiesArray = cookies.split('; ');
    const userIdCookie = cookiesArray.find(cookie => cookie.startsWith('User_ID='));
    const user_ID = userIdCookie ? userIdCookie.split('=')[1] : null;
    const [currentView, setCurrentView] = useState('user');
    const navigate = useNavigate();
    console.log(user_ID);

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="container">
            <div className="container1">
                <div className='container1-head'>
                    <div style={{ display: 'flex' }}>
                        <h6 style={{ fontSize: '1.8rem', fontWeight: 'revert-layer', color: 'green' }}>Đoạn tin nhắn</h6>
                        <p style={{ marginLeft: 'auto' }}>3 chấm</p>
                    </div>
                    <input type="text" placeholder='Tìm kiếm người dùng' />
                    <div style={{ display: 'flex' }}>
                        <h6 onClick={() => setCurrentView('user')} style={{ cursor: 'pointer', marginRight: '20px' }}>Cá nhân</h6>
                        <h6 onClick={() => setCurrentView('group')} style={{ cursor: 'pointer' }}>Cộng Đồng</h6>
                    </div>
                </div>
                <div className="chatname" style={{ padding: '0' }}>
                    {currentView === 'user' ? <MessengerUser /> : <MessengerGroup />}
                </div>
            </div>
            <div className="container2">
                <p>chatbox</p>
            </div>
        </div>
    );
}

export default Messenger;
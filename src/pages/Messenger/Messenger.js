import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import styles from './Messenger.module.css';
import MessengerUser from './MessengerUser/MessengerUser';
import MessengerGroup from './MessengerGroup/MessengerGroup';
import ChatBoxUser from './ChatBox/ChatBoxUser';
import ChatBoxGroup from './ChatBox/ChatBoxGroup';
import { useCheckCookie } from '../../Cookie/getCookie.js';
import { useLocation } from 'react-router-dom';

function Messenger() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    const user_ID =useCheckCookie('User_ID', '/TaiKhoan');
    const [currentView, setCurrentView] = useState(type);
    const [activeTab, setActiveTab] = useState('user');
    const navigate = useNavigate();

    

    const handleUserClick = (type, userId) => {
        navigate(`/Messenger?type=${type}&user_id=${userId}`);
        
    };

    const handleViewChange = (view) => {
        setActiveTab(view);
        setCurrentView(view);
        navigate(`/Messenger?type=${view}&user_id=${user_ID}`);
    };

    const handleGroupClick = (groupId) => {
        navigate(`/Messenger?type=group&group_id=${groupId}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.container1}>
                <div className={styles.container1Head}>
                    <div className={styles.title}>
                        <h6 style={{ fontSize: '1.8rem', fontWeight: 'revert', color: 'green', }}>Chats</h6>
                        <p style={{  marginTop: '0px',fontSize: '1.4rem',marginRight: '10px' }}><i class="fa-regular fa-pen-to-square"></i></p>
                    </div>
                    <input type="text" placeholder='Tìm kiếm người dùng' />
                <div className={styles.tabs}>
            <h6 
                onClick={() => handleViewChange('user')} 
                className={`${styles.tab} ${activeTab === 'user' ? styles.active : ''}`}
            >
                Cá nhân
            </h6>
            <h6 
                onClick={() => handleViewChange('group')} 
                className={`${styles.tab} ${activeTab === 'group' ? styles.active : ''}`}
            >
                Cộng Đồng
            </h6>
        </div>
                </div>
                <div className={styles.chatname} style={{ padding: '0' }}>
                    {currentView === 'user' ? <MessengerUser user_ID={user_ID} onUserClick={handleUserClick} /> : <MessengerGroup user_ID={user_ID} onGroupClick={handleGroupClick} />}
                </div>
            </div>
            <div className={styles.container2}>
                <Routes>
                    <Route path="/" element={currentView === 'user' ? <ChatBoxUser /> : <ChatBoxGroup />} />
                </Routes>
            </div>
        </div>
    );
}

export default Messenger;
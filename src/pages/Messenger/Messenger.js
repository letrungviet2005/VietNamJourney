import React, { useState } from 'react';
import styles from './Messenger.module.css';
import MessengerUser from './MessengerUser/MessengerUser';
import MessengerGroup from './MessengerGroup/MessengerGroup';
import ChatBox from './ChatBox/ChatBox';

function Messenger() {
    const cookies = document.cookie;
    const cookiesArray = cookies.split('; ');
    const userIdCookie = cookiesArray.find(cookie => cookie.startsWith('User_ID='));
    const user_ID = userIdCookie ? userIdCookie.split('=')[1] : null;
    const [currentView, setCurrentView] = useState('user');
    console.log(user_ID);

    return (
        <div className={styles.container}>
            <div className={styles.container1}>
                <div className={styles.container1Head}>
                    <div style={{ display: 'flex' }}>
                        <h6 style={{ fontSize: '1.8rem', fontWeight: 'revert-layer', color: 'green' }}>Đoạn tin nhắn</h6>
                        <p style={{ marginLeft: 'auto',marginTop:'5px' }}><i class="fa-solid fa-gear"></i></p>
                    </div>
                    <input type="text" placeholder='Tìm kiếm người dùng' />
                    <div style={{ display: 'flex' }}>
                        <h6 onClick={() => setCurrentView('user')} style={{ cursor: 'pointer', marginRight: '20px' }}>Cá nhân</h6>
                        <h6 onClick={() => setCurrentView('group')} style={{ cursor: 'pointer' }}>Cộng Đồng</h6>
                    </div>
                </div>
                <div className={styles.chatname} style={{ padding: '0' }}>
                    {currentView === 'user' ? <MessengerUser user_ID={user_ID} /> : <MessengerGroup user_ID={user_ID} />}
                </div>
            </div>
            <div className={styles.container2}>
                <ChatBox />
            </div>
        </div>
    );
}

export default Messenger;
import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import styles from './Messenger.module.css';
import MessengerUser from './MessengerUser/MessengerUser';
import MessengerGroup from './MessengerGroup/MessengerGroup';
import ChatBoxUser from './ChatBox/ChatBoxUser';
import ChatBoxGroup from './ChatBox/ChatBoxGroup';
import { useCheckCookie } from '../../Cookie/getCookie.js';

function Messenger() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    const user_ID = useCheckCookie('User_ID', '/TaiKhoan');
    const [currentView, setCurrentView] = useState(type);
    const [activeTab, setActiveTab] = useState('user');
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [array, setArray] = useState([]);
    const navigate = useNavigate();
    const ws = useRef(null);

    useEffect(() => {
        const fetchOnlineUsers = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/getOnlineUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_id: user_ID }),
                });
                const data = await response.json();
                setOnlineUsers(data.onlineUsers);

                // Sau khi nhận được danh sách onlineUsers từ API, gửi nó qua WebSocket
                if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                    ws.current.send(JSON.stringify({ type: 'getUserOnlines', onlineUsers: data.onlineUsers }));
                }
            } catch (error) {
                console.error('Error fetching online users:', error);
            }
        };

        fetchOnlineUsers();
        ws.current = new WebSocket('ws://localhost:8080');
        ws.current.onopen = () => {
            console.log('WebSocket connected');
            ws.current.send(JSON.stringify({ type: 'subscribe', user_online: user_ID }));
        };

        let handledOnce = false; // Biến flag để chỉ xử lý dữ liệu một lần

        ws.current.onmessage = (event) => {
            const receivedMessage = JSON.parse(event.data);
            
            if (!handledOnce && receivedMessage.type === 'getUserOnlines') {
                setArray(receivedMessage.onlineUsers);
                handledOnce = true; // Đánh dấu đã xử lý dữ liệu
            }
        };

        ws.current.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            ws.current.close();
        };
    }, [user_ID]);

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
                        <h6 style={{ fontSize: '1.8rem', fontWeight: 'revert', color: 'green' }}>Chats</h6>
                        <p style={{ marginTop: '0px', fontSize: '1.4rem', marginRight: '10px' }}>
                            <i className="fa-regular fa-pen-to-square"></i>
                        </p>
                    </div>
                    <input type="text" placeholder="Tìm kiếm người dùng" />
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
                            Cộng đồng
                        </h6>
                    </div>
                </div>
                <div className={styles.chatname} style={{ padding: '0' }}>
                    {currentView === 'user' ? (
                        <MessengerUser user_ID={user_ID} onUserClick={handleUserClick} onlineUsers={array} />
                    ) : (
                        <MessengerGroup user_ID={user_ID} onGroupClick={handleGroupClick} />
                    )}
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
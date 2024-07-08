import React, { useState, useEffect, useRef } from 'react';
import styles from './MessengerUser.module.css';

function MessengerUser({ user_ID, onUserClick }) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const ws = useRef(null);

    useEffect(() => {
        fetchUsersChat();

        ws.current = new WebSocket('ws://localhost:8080');
        ws.current.onopen = () => {
            console.log('WebSocket connected');
            ws.current.send(JSON.stringify({ type: 'subscribe', user_from: user_ID}));
        };

        ws.current.onmessage = (event) => {
            const receivedMessage = JSON.parse(event.data);
            if (receivedMessage.type === 'sendMessage' && receivedMessage.user_to === user_ID) {
                updateUsersChat(receivedMessage);
            }else if (receivedMessage.type === 'sendMessage' && receivedMessage.user_from === user_ID) {
                updateUsersChatFrom(receivedMessage);
            }
        };

        ws.current.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            ws.current.close();
        };
    }, [user_ID]);

    const fetchUsersChat = () => {
        fetch('http://localhost:8000/api/getUsersChat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_from: user_ID }),
        })
            .then(response => response.json())
            .then(data => setUsers(data.chats))
            .catch(error => console.error('Error fetching users:', error));
    };

    const updateUsersChat = (receivedMessage) => {
    setUsers(prevUsers => {
        // Tìm người dùng trong danh sách và cập nhật tin nhắn mới nhất của họ
        const userIndex = prevUsers.findIndex(user => user.user_to == receivedMessage.user_from);
        
        let updatedUsers;
        
        
        if (userIndex !== -1) {
            updatedUsers = [...prevUsers];
            updatedUsers.splice(userIndex, 1); 
        } else {
            updatedUsers = prevUsers;
        }
        
        
        const updatedUser = {
            user_to: receivedMessage.user_from,
            user_image: receivedMessage.user_image, 
            user_name: receivedMessage.user_name,   
            latest_content: receivedMessage.content,
        };
        
        return [updatedUser, ...updatedUsers];
    });
    };
    
     const updateUsersChatFrom = (receivedMessage) => {
    setUsers(prevUsers => {
        // Tìm người dùng trong danh sách và cập nhật tin nhắn mới nhất của họ
        const userIndex = prevUsers.findIndex(user => user.user_to == receivedMessage.user_to);
        
        let updatedUsers;
        
        
        if (userIndex !== -1) {
            updatedUsers = [...prevUsers];
            updatedUsers.splice(userIndex, 1); 
        } else {
            updatedUsers = prevUsers;
        }
        
        
        const updatedUser = {
            user_to: receivedMessage.user_to,
            user_image: receivedMessage.user_image_from, 
            user_name: receivedMessage.user_name_from,   
            latest_content: receivedMessage.content,
        };
        
        return [updatedUser, ...updatedUsers];
    });
};

    const handleUserClick = (type, userId) => {
        onUserClick(type, userId);
        setSelectedUser(userId);
    };

    return (
      <div className={styles.container}>
    {users.map(user => (
        <div
            key={user.user_to}
            className={`${styles.containeruser} ${selectedUser === user.user_to ? styles.selected : ''}`}
            onClick={() => handleUserClick('user', user.user_to)}
        >
            <div className={styles.useravatar}>
                <img src={user.user_image} alt="avatar" />
                <div className={styles.activeDot}></div> {/* Green dot for user activity */}
            </div>
            <div className={styles.userinfo}>
                <h6>{user.user_name}</h6>
                <p>{user.latest_content} · 6 phút </p>
            </div>
        </div>
    ))}
</div>
    );
}

export default MessengerUser;
import React, { useState, useEffect, useRef } from 'react';
import { Skeleton } from 'antd';
import styles from './MessengerUser.module.css';

function MessengerUser({ user_ID, onUserClick, onlineUsers }) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const ws = useRef(null);

    useEffect(() => {
        fetchUsersChat();

        ws.current = new WebSocket('ws://localhost:8080');
        ws.current.onopen = () => {
            ws.current.send(JSON.stringify({ type: 'subscribe', user_from: user_ID }));
        };

        ws.current.onmessage = (event) => {
            const receivedMessage = JSON.parse(event.data);
            if (receivedMessage.type === 'sendMessage' && receivedMessage.user_to === user_ID) {
                updateUsersChat(receivedMessage);
            } 
            if (receivedMessage.type === 'sendMessage' && receivedMessage.user_from === user_ID) {
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
            .then(data => {
                setUsers(data.chats);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setLoading(false);
            });
    };

    const updateUsersChat = (receivedMessage) => {
        setUsers(prevUsers => {
            const userIndex = prevUsers.findIndex(user => user.user_to == receivedMessage.user_from);
            let updatedUsers;
            if (userIndex !== -1) {
                updatedUsers = [...prevUsers];
                updatedUsers.splice(userIndex, 1); 
            } else {
                updatedUsers = prevUsers;
            }

            let lastcontent;
            if (receivedMessage.image != null) {
                lastcontent = 'Hình ảnh';
            } else {
                lastcontent = receivedMessage.content;
            }

            const updatedUser = {
               user_to: prevUsers[userIndex].user_to,
                user_image: prevUsers[userIndex].user_image,
                user_name: prevUsers[userIndex].user_name,
                latest_content: lastcontent,
            };

            return [updatedUser, ...updatedUsers];
        });
    };

    const updateUsersChatFrom = (receivedMessage) => {
        setUsers(prevUsers => {
            const userIndex = prevUsers.findIndex(user => user.user_to == receivedMessage.user_to);
            let updatedUsers;
            if (userIndex !== -1) {
                updatedUsers = [...prevUsers];
                updatedUsers.splice(userIndex, 1); 
            } else {
                updatedUsers = prevUsers;
            }

            let lastcontent;
            if (receivedMessage.image != null) {
                lastcontent = 'Hình ảnh';
            } else {
                lastcontent = receivedMessage.content;
            }

            const updatedUser = {
                user_to: prevUsers[userIndex].user_to,
                user_image: prevUsers[userIndex].user_image,
                user_name: prevUsers[userIndex].user_name,
                latest_content: lastcontent,
            };

            return [updatedUser, ...updatedUsers];
        });
    };

    const handleUserClick = (type, userId) => {
        onUserClick(type, userId);
        setSelectedUser(userId);
    };

    const isUserOnline = (userTo) => {
        return onlineUsers.includes(userTo);
    };

    return (
        <div className={styles.container}>
            {loading ? (
                <div>
                    <Skeleton avatar paragraph={{ rows: 1 }} active />
                    <Skeleton avatar paragraph={{ rows: 1 }} active />
                    <Skeleton avatar paragraph={{ rows: 1 }} active />
                </div>
            ) : (
                users.map(user => (
                    <div
                        key={user.user_to}
                        className={`${styles.containeruser} ${selectedUser === user.user_to ? styles.selected : ''}`}
                        onClick={() => handleUserClick('user', user.user_to)}
                    >
                        <div className={styles.useravatar}>
                            <img src={user.user_image} alt="avatar" />
                            {isUserOnline(user.user_to) && <div className={styles.activeDot}></div>} {/* Green dot for user activity */}
                        </div>
                        <div className={styles.userinfo}>
                            <h6>{user.user_name}</h6>
                            <p>{user.latest_content ? user.latest_content : "Hình Ảnh"}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default MessengerUser;
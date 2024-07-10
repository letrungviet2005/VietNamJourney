import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ChatBox.module.css';
import dots from '../../../Images/User/dots.png';
import anh from '../../../Images/User/anhchiendich.png';

function ChatBoxUser() {
    const cookies = document.cookie;
    const cookiesArray = cookies.split('; ');
    const userIdCookie = cookiesArray.find(cookie => cookie.startsWith('User_ID='));
    const user_from = userIdCookie ? userIdCookie.split('=')[1] : null;

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const user_id = params.get('user_id');
    const [allowinputmessage, setInputmessage] = useState(true);
    
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [userFromInfo, setUserFromInfo] = useState({});
    const contentRef = useRef(null);

    useEffect(() => {
    if (user_id == 0 || user_from == user_id) {
        setInputmessage(false);
    } else {
        setInputmessage(true);
    }
}, [user_id]);

    

    const ws = useRef(null);

    useEffect(() => {
        fetchMessages(user_from, user_id);

        ws.current = new WebSocket('ws://localhost:8080');
        ws.current.onopen = () => {
            ws.current.send(JSON.stringify({ type: 'subscribe', user_to_chat: user_id, user_from_chat: user_from }));
        };

        ws.current.onmessage = (event) => {
            const receivedMessage = JSON.parse(event.data);
            if (receivedMessage.user_to === user_from && receivedMessage.user_from === user_id) {
                setMessages(prevMessages => [...prevMessages, receivedMessage]);
            }
        };

        ws.current.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            ws.current.close();
        };
    }, [user_from, user_id]);

    const fetchMessages = (from, to) => {
    fetch('http://localhost:8000/api/getChats', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_from: from, user_to: to }),
    })
        .then(response => response.json())
        .then(data => {
            setMessages(data.chats);
            setUserInfo(data.userToInfo);
            setUserFromInfo(data.userFromInfo);
        })
        .catch(error => console.error('Error fetching messages:', error));
};

    useEffect(() => {
        contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }, [messages]);

    const handleSendMessage = () => {
        const newMessage = {
            user_from: user_from,
            user_to: user_id,
            content: message,
            user_image: userFromInfo.image,
            user_name: userFromInfo.name,
            user_image_from: userInfo.image,
            user_name_from: userInfo.name,
        };
        sendMessageToServer(newMessage);
        sendMessageToWebSocket(newMessage);
        setMessage('');
    };

    const sendMessageToServer = (newMessage) => {
        fetch('http://localhost:8000/api/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMessage),
        })
            .then(response => response.json())
            .then(data => setMessages([...messages, data]))
            .catch(error => console.error('Error sending message:', error));
    };

    const sendMessageToWebSocket = (newMessage) => {
        const messageForWebSocket = {
            type: 'sendMessage',
            ...newMessage,
        };
        ws.current.send(JSON.stringify(messageForWebSocket));
    };

    const getMessageAlignment = (msg) => {
        return msg.user_from == user_from ? styles.alignEnd : styles.alignStart;
    };

   return (
        <div className={styles.container}>
            {userInfo && userInfo.image ? (
                <div className={styles.containerHeader}>
                    <img src={userInfo.image} alt="Avatar" />
                    <div className={styles.containerHeaderInfo}>
                        <h6 style={{ fontWeight: 'revert' }}>{userInfo.name || 'Người dùng'}</h6>
                        <p>Đang hoạt động</p>
                    </div>
                    <div className={styles.containerHeaderSettings}>
                        <img src={dots} alt="Settings" />
                    </div>
                </div>
            ) : (
                <h6>loading...</h6>
            )}
            <div className={styles.content} ref={contentRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={`${styles.msg} ${getMessageAlignment(msg)}`}>
                    {msg.content &&  <h6 className={styles.msgContent}>{msg.content}</h6>}
                        {msg.image && <img src={msg.image} alt="Avatar" />}
                        <span className={styles.msgTime}>{msg.created_at}</span>
                    </div>
                ))}
           </div>
           {allowinputmessage &&
               <div className={styles.footer}>
                <input
                    type="text"
                    placeholder="Nhập tin nhắn..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Gửi</button>
            </div>}
        </div>
    );
}

export default ChatBoxUser;
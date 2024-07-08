import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ChatBoxGroup.module.css';
import anh from '../../../Images/Icons/Viet.jpeg';
import dots from '../../../Images/User/dots.png';

function ChatBoxGroup() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    const group_id = params.get('group_id');

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(['Group message 1', 'Group message 2']);
    const contentRef = useRef(null);

    useEffect(() => {
        contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }, [messages]);

    const handleSendMessage = () => {
        console.log('Đang gửi tin nhắn:', message);
        setMessages([...messages, message]);
        setMessage('');
    };

    return (
        <div className={styles.container}>
            <div className={styles.containerHeader}>
                <img src={anh} alt="Avatar"></img>
                <div className={styles.containerHeaderInfo}>
                    <h6>Group Chat</h6>
                    <p>Hoạt động 5 phút trước</p>
                </div>
                <div className={styles.containerHeaderSettings}>
                    <img src={dots} alt="Settings"></img>
                </div>
            </div>
            <div className={styles.content} ref={contentRef}>
                <p>Type: {type}</p>
                <p>Group ID: {group_id}</p>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <div className={styles.footer}>
                <input
                    type="text"
                    placeholder="Nhập tin nhắn..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Gửi</button>
            </div>
        </div>
    );
}

export default ChatBoxGroup;
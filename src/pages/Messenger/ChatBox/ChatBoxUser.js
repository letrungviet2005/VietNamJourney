import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Skeleton } from 'antd';
import styles from './ChatBoxUser.module.css';
import dots from '../../../Images/User/dots.png';
import logo from '../../../Images/Message/formessage.png';

function ChatBoxUser() {
    const cookies = document.cookie;
    const cookiesArray = cookies.split('; ');
    const userIdCookie = cookiesArray.find(cookie => cookie.startsWith('User_ID='));
    const user_from = userIdCookie ? userIdCookie.split('=')[1] : null;

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const user_id = params.get('user_id');
    const [allowInputMessage, setAllowInputMessage] = useState(true);

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [userFromInfo, setUserFromInfo] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const contentRef = useRef(null);

    useEffect(() => {
        if (user_id === '0' || user_from === user_id) {
            setAllowInputMessage(false);
        } else {
            setAllowInputMessage(true);
        }
    }, [user_id]);

    const ws = useRef(null);

    useEffect(() => {
        setLoading(true);
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
            if (data.chats) setMessages(data.chats);
            if (data.userToInfo) setUserInfo(data.userToInfo);
            if (data.userFromInfo) setUserFromInfo(data.userFromInfo);
            setLoading(false); // Khi dữ liệu đã tải xong
        })
        .catch(error => {
            console.error('Error fetching messages:', error);
            setLoading(false); // Ngừng hiển thị skeleton khi có lỗi
        });
    };

    useEffect(() => {
        contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }, [messages]);

    const handleSendMessage = () => {
        if (!message && !selectedImage) return;

        const newMessage = {
            user_from: user_from,
            user_to: user_id,
            content: message || null,
            image: selectedImage ? URL.createObjectURL(selectedImage) : null,
            user_image: userFromInfo.image,
            user_name: userFromInfo.name,
            user_image_from: userInfo.image,
            user_name_from: userInfo.name,
        };

        sendMessageToServer(newMessage, selectedImage);
    };

    const sendMessageToServer = (newMessage, selectedImage) => {
        const formData = new FormData();
        formData.append('user_from', newMessage.user_from);
        formData.append('user_to', newMessage.user_to);
        if (newMessage.content != null) {
            formData.append('content', newMessage.content);
        }
        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        fetch('http://localhost:8000/api/sendMessage', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            setMessages([...messages, data]);
            sendMessageToWebSocket(data);
            setMessage('');
            setSelectedImage(null);
        })
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
        return msg.user_from === user_from ? styles.alignEnd : styles.alignStart;
    };

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedImage(file);
        }
    };

    return (
        <div className={styles.container}>
            {loading ? (
                <Skeleton avatar paragraph={{ rows: 1 }} />
            ) : (
                userInfo && userInfo.image && allowInputMessage ? (
                    <div className={styles.containerHeader}>
                        <img src={userInfo.image} alt="Avatar" />
                        <div className={styles.containerHeaderInfo}>
                            <h6 style={{ fontWeight: 'revert' }}>{userInfo.name || 'Người dùng'}</h6>
                            <p>Người dùng VietNamJourney</p>
                        </div>
                        <div className={styles.containerHeaderSettings}>
                            <img src={dots} alt="Settings" />
                        </div>
                    </div>
                ) : (
                    <div>
                        <p style={{ textAlign: 'center', fontSize: '1.5rem', marginTop: '4rem' }}>Chào mừng đến với trang trò chuyện của <span style={{ fontWeight: 'bold', color: 'green' }}>Vietnam Journey</span></p>
                        <p style={{ textAlign: 'center', fontSize: '1.2rem', marginTop: '0rem' }}>Chọn một người để bắt đầu ...</p>
                        <img src={logo} alt="Logo" style={{ width: '50%', marginTop: '2rem', textAlign: 'center', marginLeft: '25%', marginRight: '25%' }} />
                    </div>
                )
            )}
            <div className={styles.content} ref={contentRef}>
                {loading ? (
                    <Skeleton active paragraph={{ rows: 4 }} />
                ) : (
                    messages.length > 0 && messages.map((msg, index) => (
                        <div key={index} className={`${styles.msg} ${getMessageAlignment(msg)}`}>
                            {msg.content && (
                                <h6 className={`${styles.msgContent} ${msg.user_from.toString() === user_from ? styles.msgContentFromUser : styles.msgContentFromOther}`}>
                                    {msg.content}
                                </h6>
                            )}
                            {msg.image && (
                                <img
                                    src={msg.image}
                                    alt="Sent"
                                    className={styles.msgImage}
                                    style={{
                                        marginLeft: msg.user_from.toString() === user_from ? 'auto' : '0',
                                        marginRight: msg.user_from.toString() !== user_from ? 'auto' : '0'
                                    }}
                                />
                            )}
                            <span
                                className={styles.msgTime}
                                style={{
                                    marginLeft: msg.user_from.toString() === user_from ? 'auto' : '0',
                                    marginRight: msg.user_from.toString() !== user_from ? 'auto' : '0'
                                }}
                            >
                                {msg.created_at}
                            </span>
                        </div>
                    ))
                )}
            </div>
            {allowInputMessage &&
                <div className={styles.footer}>
                    <div className={styles.footerinput}>
                        <div className={styles.inputWrapper}>
                            <textarea
                                placeholder="Nhập tin nhắn..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                                id="imageInput"
                            />
                            <label htmlFor="imageInput" style={{ cursor: 'pointer', marginTop: '0' }}>
                                <i className="fa-solid fa-image"></i>
                            </label>
                        </div>
                        <button onClick={handleSendMessage}>Gửi</button>
                    </div>
                    {selectedImage && (
                        <div className={styles.selectedImagePreview}>
                            <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
                        </div>
                    )}
                </div>
            }
        </div>
    );
}

export default ChatBoxUser;
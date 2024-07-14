import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Skeleton } from 'antd';
import styles from './ChatBoxGroup.module.css';
import dots from '../../../Images/User/dots.png';
import logo from '../../../Images/Message/formessage.png';

function ChatBoxGroup() {
    const cookies = document.cookie;
    const cookiesArray = cookies.split('; ');
    const userIdCookie = cookiesArray.find(cookie => cookie.startsWith('User_ID='));
    const user_from = userIdCookie ? userIdCookie.split('=')[1] : null;

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const group_id = params.get('group_id');

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isMember, setIsMember] = useState(true);
    const [groupInfo, setGroupInfo] = useState({});
    const [loading, setLoading] = useState(true); // Thêm trạng thái loading
    const contentRef = useRef(null);
    const ws = useRef(null);

    useEffect(() => {
        setIsMember(true);  // Reset isMember when group_id changes
        setMessages([]);  // Clear previous messages when group_id changes
        setGroupInfo({});  // Clear previous group info when group_id changes
        setLoading(true); // Set loading to true when group_id changes

        const fetchGroupChats = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/getGroupChats', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ group_id: group_id, user_id: user_from })
                });

                const data = await response.json();
                if (data.status === 'not_member') {
                    setIsMember(false);
                } else {
                    setMessages(data.chats);
                    setGroupInfo(data.groupInfo);
                }
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching group chats:', error);
                setLoading(false); // Set loading to false if there's an error
            }
        };

        ws.current = new WebSocket('ws://localhost:8080');
        ws.current.onopen = () => {
            ws.current.send(JSON.stringify({
                type: 'subscribe',
                user_group_from: user_from,
                group_id: group_id
            }));
        };

        ws.current.onmessage = (event) => {
            const parsedMessage = JSON.parse(event.data);
            if (parsedMessage.type === 'chatgroup') {
                setMessages((prevMessages) => [...prevMessages, parsedMessage.chat]);
            }
        };

        fetchGroupChats();

        return () => {
            ws.current.close();
        };
    }, [group_id, user_from]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!message && !selectedImage) return;

        const formData = new FormData();
        formData.append('user_id', user_from);
        formData.append('group_id', group_id);
        formData.append('message', message);
        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        try {
            const response = await fetch('http://localhost:8000/api/sendMessageGroup', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            setMessage('');
            setSelectedImage(null);

            ws.current.send(JSON.stringify({
                type: 'chatgroup',
                chat: data.chat,
                userIds: data.userIds,
                group_id: data.group_id
            }));
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const scrollToBottom = () => {
        if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
    };

    return (
        <div className={styles.container}>
            {loading ? (
                <div>
                    <Skeleton  paragraph={{ rows: 2 }} active />
                    <Skeleton  paragraph={{ rows: 4 }} active />
                    <Skeleton  paragraph={{ rows: 2 }} active />
                </div>
            ) : (
                <>
                    {isMember && 
                    <div className={styles.containerHeader}>
                        <img src={groupInfo.image} alt="Avatar"></img>
                        <div className={styles.containerHeaderInfo}>
                            <h6>{groupInfo.name}</h6>
                            <p>{groupInfo.province}</p>
                        </div>
                        <div className={styles.containerHeaderSettings}>
                            <img src={dots} alt="Settings"></img>
                        </div>
                    </div> }
                    <div className={styles.content} ref={contentRef}>
                        {!isMember ? (
                            <div>
                                <p style={{ textAlign: 'center', fontSize: '1.5rem', marginTop: '4rem' }}>Chào mừng đến với trang trò chuyện của <span style={{ fontWeight: 'bold', color: 'green' }}>Vietnam Journey</span></p>
                                <p style={{ textAlign: 'center', fontSize: '1.2rem', marginTop: '0rem' }}>Chọn một nhóm để bắt đầu ...</p>
                                <img src={logo} alt="Logo" style={{ width: '50%', marginTop: '2rem', textAlign: 'center', marginLeft: '25%', marginRight: '25%' }} />
                            </div>
                        ) : (
                            <>
                                {messages.map((msg, index) => (
                                    <div key={index} className={styles.message}>
                                        <div style={{marginBottom :'0.1rem'}}>
                                            <img alt="logo" src={msg.user_image} style={{ display: msg.user_from == user_from ? 'none' : 'block',width : '1rem',height : "1rem", borderRadius : '50%'}}></img>
                                        </div>
                                        {msg.content && <div className={msg.user_from == user_from ? styles.contentRight : styles.contentLeft}>
                                            <span style={{ display: msg.user_from == user_from ? 'none' : 'block',fontWeight :600,fontSize : '0.8rem' }}>{msg.user_name}</span>
                                            <span>{msg.content}</span>
                                        </div>}
                                        {msg.image && <img src={msg.image} alt="Sent" style={{ marginLeft: msg.user_from == user_from ? 'auto' : '0' }} />}
                                        <small style={{ marginLeft: msg.user_from == user_from ? 'auto' : '0' }}>{msg.created_at}</small>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </>
            )}
            {isMember && !loading &&
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
            </div>}
        </div>
    );
}

export default ChatBoxGroup;
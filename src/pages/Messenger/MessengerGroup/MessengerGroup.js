import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Skeleton } from 'antd'; // Import Skeleton from antd
import styles from './MessengerGroup.module.css';
import image from '../../../Images/Icons/Viet.jpeg';

function MessengerGroup({ onGroupClick }) {
    const cookies = document.cookie;
    const cookiesArray = cookies.split('; ');
    const userIdCookie = cookiesArray.find(cookie => cookie.startsWith('User_ID='));
    const user_ID = userIdCookie ? userIdCookie.split('=')[1] : null;

    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const ws = useRef(null);

    useEffect(() => {
        if (user_ID) {
            fetchGroups(user_ID);

            ws.current = new WebSocket('ws://localhost:8080');
            ws.current.onopen = () => {
                ws.current.send(JSON.stringify({ type: 'subscribe', chat_group_from: user_ID }));
            };

            ws.current.onmessage = (event) => {
                const receivedMessage = JSON.parse(event.data);
                console.log(receivedMessage);
                console.log(receivedMessage.type);
                console.log(receivedMessage.chat.user_from);
                console.log(receivedMessage.chat.content);
                if (receivedMessage.type === 'chatgroup') {
                    console.log("upadte từ khách");
                    updateGroupsChat(receivedMessage);
                }  if (receivedMessage.type === 'chatgroup' && receivedMessage.chat.user_from == user_ID) {
                    updateGroupsChatFrom(receivedMessage);
                    console.log("upadte từ chủ");
                }
            };

            ws.current.onclose = () => {
                console.log('WebSocket disconnected');
            };

            return () => {
                ws.current.close();
            };
        }
    }, [user_ID]);

    const fetchGroups = (userId) => {
        axios.post('http://localhost:8000/api/getGroupUser', { user_id: userId })
            .then(response => {
                const { campaigns } = response.data;
                setGroups(campaigns);
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch(error => {
                console.error('Error fetching groups:', error);
                setLoading(false); // Set loading to false if there's an error
            });
    };

    const updateGroupsChat = (receivedMessage) => {
        setGroups(prevGroups => {
            const groupIndex = prevGroups.findIndex(group => group.campaignId == receivedMessage.group_id);
            let updatedGroups;
            if (groupIndex !== -1) {
                updatedGroups = [...prevGroups];
                updatedGroups.splice(groupIndex, 1);
            } else {
                updatedGroups = prevGroups;
            }

            const previousGroup = prevGroups.find(group => group.campaignId == receivedMessage.group_id);
            const updatedGroup = {
                campaignId: previousGroup.campaignId,
                image: previousGroup.image,
                name: previousGroup.name,
                last_message: receivedMessage.chat.content ? receivedMessage.chat.content : "Hình ảnh",
            };

            return [updatedGroup, ...updatedGroups];
        });
    };

    const updateGroupsChatFrom = (receivedMessage) => {
        setGroups(prevGroups => {
            const groupIndex = prevGroups.findIndex(group => group.campaignId == receivedMessage.group_id);
            let updatedGroups;
            if (groupIndex !== -1) {
                updatedGroups = [...prevGroups];
                updatedGroups.splice(groupIndex, 1);
            } else {
                updatedGroups = prevGroups;
            }

            const previousGroup = prevGroups.find(group => group.campaignId == receivedMessage.group_id);
            const updatedGroup = {
                campaignId: previousGroup.campaignId,
                image: previousGroup.image,
                name: previousGroup.name,
                last_message: receivedMessage.chat.content ? receivedMessage.chat.content : "Hình ảnh",
            };

            return [updatedGroup, ...updatedGroups];
        });
    };

    const handleGroupClick = (groupId) => {
        onGroupClick(groupId);
        setSelectedGroupId(groupId);
    };

    return (
        <div className={styles.container}>
            {loading ? (
                <>
                    <Skeleton avatar paragraph={{ rows: 1 }} active />
                    <Skeleton avatar paragraph={{ rows: 1 }} active />
                    <Skeleton avatar paragraph={{ rows: 1 }} active />
                </>
            ) : groups.length === 0 ? (
                <p>Bạn chưa tham gia group nào</p>
            ) : (
                groups.map(group => (
                    <div
                        key={group.campaignId}
                        className={`${styles.containergroup} ${selectedGroupId === group.campaignId ? styles.selected : ''}`}
                        onClick={() => handleGroupClick(group.campaignId)}
                    >
                        <div className={styles.groupavatar}>
                            <img src={group.image || image} alt="group avatar" />
                        </div>
                        <div className={styles.groupinfo}>
                            <h6 style={{ fontWeight: 'revert' }}>{group.name}</h6>
                            <span>{group.last_message ? (group.last_message) : ("Hình ảnh")}</span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default MessengerGroup;
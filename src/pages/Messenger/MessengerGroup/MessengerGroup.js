import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MessengerGroup.module.css';
import image from '../../../Images/Icons/Viet.jpeg';

function MessengerGroup({ onGroupClick }) {
    const cookies = document.cookie;
    const cookiesArray = cookies.split('; ');
    const userIdCookie = cookiesArray.find(cookie => cookie.startsWith('User_ID='));
    const user_ID = userIdCookie ? userIdCookie.split('=')[1] : null;

    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        if (user_ID) {
            fetchGroups(user_ID);
        }
    }, [user_ID]);

    const fetchGroups = (userId) => {
        axios.post('http://localhost:8000/api/getGroupUser', { user_id: userId })
            .then(response => {
                const { campaigns } = response.data;
                setGroups(campaigns); // Lưu toàn bộ response vào state groups
            })
            .catch(error => console.error('Error fetching groups:', error));
    };

    const handleGroupClick = (groupId) => {
        onGroupClick(groupId);
        console.log(groupId);
    };

    return (
        <div className={styles.container}>
            {groups.map(group => (
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
                        <span>{group.last_message }</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MessengerGroup;
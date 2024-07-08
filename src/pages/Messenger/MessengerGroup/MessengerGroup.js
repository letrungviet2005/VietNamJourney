import React, { useState } from 'react';
import styles from './MessengerGroup.module.css';
import image from '../../../Images/Icons/Viet.jpeg';

function MessengerGroup({ user_ID, onGroupClick }) {
    const [selectedGroupId, setSelectedGroupId] = useState(null);

    const handleGroupClick = (groupId) => {
        setSelectedGroupId(groupId);
        onGroupClick(groupId);
    };

    return (
        <div className={styles.container}>
            <div 
                className={`${styles.containergroup} ${selectedGroupId === '1' ? styles.selected : ''}`} 
                onClick={() => handleGroupClick('1')}
            >
                <div className={styles.groupavatar}>
                    <img src={image} alt="group avatar"></img>
                </div>
                <div className={styles.groupinfo}>
                    <h6 style={{ fontWeight: 'revert' }}>Nhóm A</h6>
                    <p>Thông báo mới nhất của nhóm A</p>
                </div>
            </div>

            <div 
                className={`${styles.containergroup} ${selectedGroupId === '2' ? styles.selected : ''}`} 
                onClick={() => handleGroupClick('2')}
            >
                <div className={styles.groupavatar}>
                    <img src={image} alt="group avatar"></img>
                </div>
                <div className={styles.groupinfo}>
                    <h6 style={{ fontWeight: 'revert' }}>Nhóm B</h6>
                    <p>Thông báo mới nhất của nhóm B</p>
                </div>
            </div>

            {/* Thêm các containergroup khác với các groupId khác nhau */}
        </div>
    );
}

export default MessengerGroup;
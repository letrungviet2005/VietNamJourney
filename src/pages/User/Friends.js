import React, { useState } from 'react';
import styles from './Friends.module.css';

const Friends = ({ imgSrc, username, isFollowed }) => {
    const [follower, setFollower] = useState(isFollowed);

    const follow = () => {
        setFollower(!follower);
    };
    return (
        <div className={styles['container2-friends']}>
            <img src={imgSrc} alt={`${username}'s avatar`} className={styles.img} />
            <div className={styles['container2-friends-info']}>
                <p style={{fontWeight : 'bold'}}>@{username}</p>
                <button onClick={follow}>{follower ? "Đang theo dõi" : "+ Theo dõi"}</button>
            </div>
        </div>
    );
};

export default Friends;
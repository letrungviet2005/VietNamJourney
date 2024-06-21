import React, { useEffect, useState } from 'react';
import styles from './Information.module.css';
import { useCheckCookie } from '../../../Cookie/getCookie';
import UpdateInformation from './updateInformation';

function Information({ user_ID }) {
    const [userData, setUserData] = useState(null);
    const user_id = useCheckCookie('User_ID', '/TaiKhoan');
    const [isFollowing, setIsFollowing] = useState(false);
    const [updateInfo, setupdateInfo] = useState(true);

    const setInfo = () => {
        setupdateInfo(false);
    };

    const onCloseInfo = () => {
        setupdateInfo(true);
    };

    useEffect(() => {
        fetch('http://localhost/BWD/vietnamjourney/Server/User/User_Information.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: user_ID, currentUserId: user_id })
        })
        .then(response => response.json())
        .then(data => {
            if (data.user) {
                setUserData(data.user);
                setIsFollowing(data.user.isFollowing);
            } else {
                console.error('Failed to fetch user data:', data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    }, [user_ID, user_id]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    const handleUpdateFollow = () => {
        const followStatus = isFollowing ? 'unfollow' : 'follow';
        fetch('http://localhost/BWD/vietnamjourney/Server/User/updateFollowStatus.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ User_ID: user_id, Followed_User_ID: user_ID, Status: followStatus })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setIsFollowing(!isFollowing);
            } else {
                console.error('Failed to update follow status:', data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    };

    const { avatar, name, username, followers, following, role, location, facebookLink } = userData;

    return (
        <div className={styles.container1}>
            <div className={styles['container1-background']}></div>
            {updateInfo ? (
                <>
                    <div className={styles['container1-avatar']}>
                        <img src={avatar} alt="Avatar" />
                    </div>
                    <div className={styles['container1-information']}>
                        <div className={styles['container1-information-name']}>{name}</div>
                        <div className={styles['container1-information-linkuser']}>@{username}</div>
                        <div className={styles['container1-information-content']}>
                            <p>
                                <i className="fa-solid fa-user-group"></i>
                                <span style={{ fontWeight: 'bold' }}> {followers}</span> theo dõi
                                <span style={{ marginLeft: '0.1rem', marginRight: '0.2rem', fontWeight: 'bold' }}> ·</span>
                                <span style={{ fontWeight: 'bold' }}>{following}</span> đang theo dõi
                            </p>
                            {role && <p><i className="fa-solid fa-building"></i> {role}</p>}
                            {location && <p><i className="fa-solid fa-location-dot"></i> Sống tại {location}</p>}
                            {facebookLink && <p><i className="fa-brands fa-square-facebook"></i> <a href={facebookLink} target="_blank" rel="noopener noreferrer">Facebook</a></p>}
                            {user_id === user_ID ? (
                                <button onClick={setInfo}>Chỉnh sửa trang cá nhân</button>
                            ) : (
                                <button onClick={handleUpdateFollow}>{isFollowing ? "Đang theo dõi" : "Theo dõi"}</button>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div style={{ marginTop: '0rem' }}>
                    <UpdateInformation onCloseInfo={onCloseInfo} user_id={user_id} />
                </div>
            )}
        </div>
    );
}

export default Information;
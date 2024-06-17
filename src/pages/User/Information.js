import React, { useEffect, useState } from 'react';
import styles from './Information.module.css';
import { useCheckCookie } from '../../Cookie/getCookie'

function Information({ user_ID }) {
    const [userData, setUserData] = useState(null);
    const user_id = useCheckCookie('User_ID', '/TaiKhoan');

    useEffect(() => {
        fetch(`http://localhost/BWD/vietnamjourney/Server/User/User_Information.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: user_ID })
        })
        .then(response => response.json())
        .then(data => {
            if (data.user) {
                setUserData(data.user);
            } else {
                console.error('Failed to fetch user data:', data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    }, [user_ID]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    const { avatar, name, username, followers, following, role, location, facebookLink } = userData;

    return (
        <div className={styles.container1}>
            <div className={styles['container1-background']}></div>
            <div className={styles['container1-avatar']}>
                <img src={avatar} alt="Avatar" />
            </div>
            <div className={styles['container1-information']}>
                <div className={styles['container1-information-name']}>{name}</div>
                <div className={styles['container1-information-linkuser']}>@{username}</div>
                <div className={styles['container1-information-content']}>
                    <p><i className="fa-solid fa-user-group"></i><span style={{ fontWeight: 'bold' }}> {followers}</span> follower
                    <span style={{ marginLeft : '0.1rem',marginRight : '0.2rem',fontWeight : 'bold' }}> ·</span>
                    <span style={{ fontWeight: 'bold' }}>{following}</span> following</p>
                    {role && <p><i className="fa-solid fa-building"></i> {role}</p>}
                    {location && <p><i className="fa-solid fa-location-dot"></i> Sống tại {location}</p>}
                    {facebookLink && <p><i className="fa-brands fa-facebook"></i> <a href={facebookLink} target="_blank" rel="noopener noreferrer">Facebook</a></p>}
                    {user_id === user_ID && <button>Chỉnh sửa trang cá nhân</button>}
                </div>
            </div>
        </div>
    );
}

export default Information;
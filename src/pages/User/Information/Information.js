import React, { useEffect, useState } from 'react';
import styles from './Information.module.css';
import { useCheckCookie } from '../../../Cookie/getCookie';
import UpdateInformation from './updateInformation';
import background from '../../../Images/User/backgrounduser.png';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from 'antd';

function Information({ user_ID }) {
    const [userData, setUserData] = useState(null);
    const user_id = useCheckCookie('User_ID', '/TaiKhoan');
    const [isFollowing, setIsFollowing] = useState(false);
    const [updateInfo, setUpdateInfo] = useState(true);
    const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading
    const navigate = useNavigate(); // Sử dụng hook useNavigate từ React Router DOM

    const setInfo = () => {
        setUpdateInfo(false);
    };

    const onCloseInfo = () => {
        setUpdateInfo(true);
    };

    useEffect(() => {
        setLoading(true); // Bắt đầu fetch dữ liệu, set loading là true
        fetch('http://localhost:8000/api/user_information', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: user_ID, currentUserId: user_id })
        })
            .then(response => response.json())
            .then(data => {
                setLoading(false); // Kết thúc fetch dữ liệu, set loading là false
                if (data.user) {
                    setUserData(data.user);
                    setIsFollowing(data.user.isFollowing);
                } else {
                    console.error('Failed to fetch user data:', data.error);
                }
            })
            .catch(error => console.error('Error:', error));
    }, [user_ID, user_id]);

    if (loading) {
        return (
            <div className={styles.container1}>
                <Skeleton avatar active paragraph={{ rows: 4 }} />
            </div>
        );
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    const handleUpdateFollow = () => {
        const followStatus = isFollowing ? 'unfollow' : 'follow';
        fetch('http://localhost/api/updateFollowStatus', {
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

    const { avatar, name, username, followers, following, role, location, facebookLink,check } = userData;

    const navigateToMessenger = () => {
        navigate(`/Messenger?type=user&user_id=${user_ID}`); // Sử dụng navigate để điều hướng đến đường dẫn Messenger
    };

    return (
        <div className={styles.container1}>
            <div className={styles['container1-background']}>
                <img src={background} alt="Background" />
            </div>
            {updateInfo ? (
                <>
                    <div className={styles['container1-avatar']}>
                        <img src={avatar} alt="Avatar" />
                    </div>
                    <div className={styles['container1-information']}>
                        <div className={styles['container1-information-name']}>{name}</div>
                        <div className={styles['container1-information-linkuser']}>@{username} {check == 1 && <i className="fa-solid fa-circle-check" style={{ color: "#258e31" }}></i>}</div>
                        <div className={styles['container1-information-content']}>
                            <p>
                                <i className="fa-solid fa-user-group"></i>
                                <span style={{ fontWeight: 'bold' }}> {followers}</span> theo dõi
                                <span style={{ marginLeft: '0.1rem', marginRight: '0.2rem', fontWeight: 'bold' }}> ·</span>
                                <span style={{ fontWeight: 'bold' }}>{following}</span> đang theo dõi
                            </p>
                            {role && <p style={{ fontWeight: '500' }}><i className="fa-solid fa-building" style={{ marginRight: '0.3rem' }} ></i> {role}</p>}
                            {location && <p style={{ fontWeight: '500' }}><i className="fa-solid fa-location-dot" style={{ marginRight: '0.3rem' }}></i> Sống tại {location}</p>}
                            {facebookLink && <p style={{ fontWeight: '500' }}><i className="fa-brands fa-square-facebook" style={{ marginRight: '0.3rem' }}></i> <a href={facebookLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'blue' }}>Facebook</a></p>}
                            {user_id === user_ID ? (
                                <button onClick={setInfo}>Chỉnh sửa trang cá nhân</button>
                            ) : (
                                    <div style={{ display: 'flex' }}>
                                        <button style={{ width: "45%", marginRight: '0.5rem' }} onClick={handleUpdateFollow}>{isFollowing ? "Đang theo dõi" : "Theo dõi"}</button>
                                        <button style={{ width: "45%" }} onClick={navigateToMessenger}>Nhắn tin</button>
                                    </div>
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
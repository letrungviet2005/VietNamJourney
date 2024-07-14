import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from 'antd';
import styles from './Friends.module.css';

const Friends = ({ User_ID }) => {
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [activeUserId, setActiveUserId] = useState(null);

    useEffect(() => {
        const fetchFollowers = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8000/api/getUnFollowedUsers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ User_ID }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                if (data.users) {
                    setFollowers(data.users);
                } else {
                    setFollowers([]);
                }
                setLoading(false);
            } catch (error) {
                setError('Đã xảy ra lỗi khi lấy danh sách người theo dõi');
                setLoading(false);
            }
        };

        fetchFollowers();
    }, [User_ID]);

    const handleAvatarClick = (userId) => {
        navigate(`/User?user_id=${userId}`);
    };

    const updateFollowerStatus = async (userId, action) => {
        try {
            const response = await fetch('http://localhost:8000/api/updateFollower', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ User_ID, Followed_User_ID: userId, Status: action }),
            });

            if (!response.ok) {
                throw new Error('Không thể cập nhật trạng thái theo dõi');
            }

            const updatedFollowers = followers.map((follower) => {
                if (follower.User_ID === userId) {
                    return {
                        ...follower,
                        is_following: action === 'follow',
                    };
                }
                return follower;
            });

            setFollowers(updatedFollowers);
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái theo dõi:', error);
        }
    };

    const handleFollowClick = (userId) => {
        if (activeUserId === userId) {
            setActiveUserId(null);
            updateFollowerStatus(userId, 'unfollow');
        } else {
            setActiveUserId(userId);
            updateFollowerStatus(userId, 'follow');
        }
    };

    return (
        <div className={styles['friends-container']}>
            {loading ? (
                <Skeleton active />
            ) : error ? (
                <p>{error}</p>
            ) : followers.length === 0 ? (
                <p>Không có thành viên tham gia nào ...</p>
            ) : (
                followers.map((follower) => (
                    <div key={follower.User_ID} className={styles['friend-item']}>
                        <img
                            src={follower.Image}
                            alt={`Ảnh đại diện của ${follower.Username}`}
                            className={styles['friend-avatar']}
                            onClick={() => handleAvatarClick(follower.User_ID)}
                            style={{ cursor: 'pointer' }}
                        />
                        <div className={styles['friend-info']}>
                            <h6
                                style={{ fontWeight: 'revert-layer', cursor: 'pointer' }}
                                onClick={() => handleAvatarClick(follower.User_ID)}
                            >
                                {follower.Username}
                            </h6>
                            <button onClick={() => handleFollowClick(follower.User_ID)}>
                                {follower.is_following ? 'Đang theo dõi' : 'Theo dõi'}
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Friends;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Friends.module.css';

const Friends = ({ User_ID }) => {
    const [followers, setFollowers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [Following, setFollowing] = useState(true);

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await fetch('http://localhost/BWD/vietnamjourney/Server/User/getFollowers.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ User_ID }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const text = await response.text();

                let data;
                try {
                    data = JSON.parse(text);
                } catch (e) {
                    throw new Error('Invalid JSON response');
                }

                if (data.users) {
                    setFollowers(data.users);
                } else {
                    setFollowers([]);
                }
            } catch (error) {
                setError('Error fetching followers');
            }
        };

        fetchFollowers();
    }, [User_ID]);

    const handleAvatarClick = (userId) => {
        navigate(`/User?user_id=${userId}`);
    };

    const following = () => {
        setFollowing(!Following)

    }

    return (
        <div className={styles['friends-container']}>
            {error ? (
                <p>{error}</p>
            ) : (
                followers.map((follower) => (
                    <div key={follower.User_ID} className={styles['friend-item']}>
                        <img
                            src={`data:image/jpeg;base64,${follower.Image}`}
                            alt={`${follower.Username}'s avatar`}
                            className={styles['friend-avatar']}
                            onClick={() => handleAvatarClick(follower.User_ID)}
                            style={{ cursor: 'pointer' }}
                        />
                        <div className={styles['friend-info']}>
                            <h6
                                style={{ fontWeight: 'revert', cursor: 'pointer' }}
                                onClick={() => handleAvatarClick(follower.User_ID)}
                            >
                                @{follower.Username}
                            </h6>
                            <button onClick={following}> {Following ? "Theo dõi" : "Đang theo dõi" }</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Friends;
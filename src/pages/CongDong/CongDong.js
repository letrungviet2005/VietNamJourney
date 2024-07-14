import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CongDong.module.css';
import Friends from '../User/Friend/Friends';
import Post from '../User/Post/Post.js';
import { Skeleton } from 'antd';

function CongDong() {
    const cookies = document.cookie;
    const cookiesArray = cookies.split('; ');
    const userIdCookie = cookiesArray.find(cookie => cookie.startsWith('User_ID='));
    const user_ID = userIdCookie ? userIdCookie.split('=')[1] : null;

    const [posts, setPosts] = useState([]);
    const [topUsers, setTopUsers] = useState([]);
    const [topGroups, setTopGroups] = useState([]); // Mảng để lưu dữ liệu nhóm hàng đầu
    const [campaignuser, setCampaignuser] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/api/getSocialPosts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setPosts(data.posts || []);
        })
        .catch(error => console.error('Error:', error));
    }, [user_ID]);

    useEffect(() => {
        fetch('http://localhost:8000/api/getSocialOutstanding', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setTopUsers(data.outstanding_users || []);
        })
        .catch(error => console.error('Error:', error));
    }, []);

    // Fetch dữ liệu từ API getTopGroup
    useEffect(() => {
        fetch('http://localhost:8000/api/getTopGroup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setTopGroups(data.top_groups || []);
        })
        .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        if (user_ID !== null) {
            fetch('http://localhost:8000/api/getCampaignUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: user_ID })
            })
            .then(response => response.json())
            .then(data => {
                setCampaignuser(data.campaigns || []);
            })
            .catch(error => console.error('Error:', error));
        }
    }, [user_ID]);

    const handleUserClick = (userId) => {
        navigate(`/User?user_id=${userId}`);
    };
    const handleGroupClick = (id) => {
        navigate(`/GroupCampaign?group_id=${id}`);
    };

    const handleSearch = () => {
        if (searchInput.trim() === '') {
            alert('Vui lòng nhập vào trường này');
        } else {
            navigate(`/Search?post_info=${searchInput}&user_info=${searchInput}`);
        }
    };

    return (
        <div className={styles.container}>
            <div className="row">
                <div className="col-lg-3">
                    <div className={styles.container3} style={{ marginBottom: '0', marginTop: '2.2rem' }}>
                        <h6 style={{ marginLeft: '0.3rem', fontWeight: '', fontSize: '1.2rem' }}>Nhóm tiên phong</h6>
                        {topGroups.length === 0 ? (
                            <Skeleton active />
                        ) : (
                            topGroups.map(group => (
                                <div key={group.id} className={styles['container3-info']} onClick={() => handleGroupClick(group.id)}>
                                    <img alt={group.name} src={group.image_url}></img>
                                    <div className={`${styles['container3-content']} ${styles['ellipsis-text']}`} style={{ maxWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <h6 style={{ fontWeight: 'revert', fontSize: '1rem' }}>{group.name}</h6>
                                        <p>{group.volunteer_count} người tham gia</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {user_ID !== null && (
                        <div className={styles.sticky}>
                            <div className={styles.container3} style={{ marginTop: '0.5rem' }}>
                                <h6 style={{ marginLeft: '0.3rem', fontWeight: '', fontSize: '1.2rem' }}>Nhóm của bạn</h6>
                                {campaignuser.length === 0 ? (
                                    <Skeleton active />
                                ) : (
                                    campaignuser.map(campaign => (
                                        <div key={campaign.id} className={styles['container3-info']} onClick={() => handleGroupClick(campaign.id)}>
                                            <img alt={campaign.name} src={campaign.image_url}></img>
                                            <div className={`${styles['container3-content']} ${styles['ellipsis-text']}`} style={{ maxWidth: '100%' }}>
                                                <h6 style={{ fontWeight: '600', fontSize: '1rem' }}>{campaign.name}</h6>
                                                <p>{campaign.province}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                </div>
                <div className="col-md-6">
                    <div className={`${styles.container1} ${styles['sticky-search-bar']}`}>
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <i
                            className="fa-solid fa-magnifying-glass"
                            onClick={handleSearch}
                            style={{ cursor: 'pointer' }}
                        ></i>
                    </div>
                    <div className={styles.container2}>
                        {posts.length === 0 ? (
                            <div style={{ textAlign: 'center', marginTop: '2rem', backgroundColor: 'white', borderRadius: '10px', padding: '2rem', fontWeight: 'revert' }}>
                                <Skeleton active />
                            </div>
                        ) : (
                            posts.map(post => (
                                <Post
                                    key={post.id}
                                    Post_ID={post.id}
                                    user_id={post.user_id}
                                    avatar={post.avatar}
                                    name={post.name}
                                    time={post.createdAt}
                                    content={post.content}
                                    image={post.image}
                                    likes={post.likes}
                                    comments={post.comments}
                                    check={post.check}
                                />
                            ))
                        )}
                    </div>
                </div>
                <div className="col-md-3">
                    <div className={styles.container3}>
                        <h6 style={{ marginLeft: '0.3rem', fontWeight: '', fontSize: '1.2rem' }}>Top người nổi bật</h6>
                        {topUsers.length === 0 ? (
                            <Skeleton active />
                        ) : (
                            topUsers.map(user => (
                                <div key={user.id} className={styles['container3-info']} onClick={() => handleUserClick(user.id)}>
                                    <img alt={user.username} src={user.image}></img>
                                    <div className={styles['container3-content']}>
                                        <h6 style={{ fontWeight: 'revert-layer', fontSize: '1rem' }}>{user.username}{user.check == 1 && <i className="fa-solid fa-circle-check" style={{ color: "#258e31", fontSize: '0.8rem', marginLeft: '0.2rem' }}></i>}</h6>
                                        <p>{user.total_following} người theo dõi</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className={styles.sticky}>
                        {user_ID != null &&
                            <div className={styles.container4}>
                                <h6 style={{ marginLeft: '1rem', fontWeight: '', fontSize: '1.2rem' }}>Gợi ý cho bạn</h6>
                                
                                <Friends User_ID={user_ID} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CongDong;
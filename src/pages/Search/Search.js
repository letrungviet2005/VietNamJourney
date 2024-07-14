import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Skeleton } from 'antd';
import styles from './Search.module.css';
import Post from '../User/Post/Post.js';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Search() {
    const cookies = document.cookie;
    const cookiesArray = cookies.split('; ');
    const userIdCookie = cookiesArray.find(cookie => cookie.startsWith('User_ID='));
    const user_ID = userIdCookie ? userIdCookie.split('=')[1] : null;
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const query = useQuery();
    const postInfo = query.get('post_info');
    const userInfo = query.get('user_info');
    const navigate = useNavigate();

    useEffect(() => {
        if (postInfo || userInfo) {
            const bodyData = {
                post_info: postInfo
            };
            if (userInfo) {
                bodyData.user_info = userInfo;
            }

            fetch('http://localhost:8000/api/getListSearch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            })
            .then(response => response.json())
            .then(data => {
                setPosts(data.posts || []);
                setUsers(data.users || []);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
            });
        }
    }, [postInfo, userInfo]);

    const handleUserClick = (userId) => {
        navigate(`/User?user_id=${userId}`);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <div className={styles.container2}>
                        {loading ? (
                            <Skeleton active />
                        ) : posts.length === 0 ? (
                            <div style={{ textAlign: 'center', marginTop: '2rem', backgroundColor: 'white', borderRadius: '10px', padding: '2rem', fontWeight: 'revert' }}>
                                Không tìm thấy bài viết nào.
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
                                />
                            ))
                        )}
                    </div>
                </div>
                <div className="col-md-4">
                    {userInfo && user_ID != null && (
                        <div className={styles.container3}>
                            {loading ? (
                                <Skeleton active />
                            ) : users.length > 0 ? (
                                <>
                                    <h6 style={{ marginLeft: '0.3rem', fontWeight: '', fontSize: '1.2rem' }}>Danh sách người dùng</h6>
                                    {users.map(user => (
                                        <div style={{ cursor: 'pointer' }} key={user.id} className={styles['container3-info']} onClick={() => handleUserClick(user.id)}>
                                            <img alt={user.username} src={user.Image}></img>
                                            <div className={styles['container3-content']}>
                                                <h6>{user.Username}</h6>
                                                <p>{user.total_following} người theo dõi</p>
                                            </div>
                                        </div>
                                    ))}
                                    <h6 style={{ textAlign : 'right', marginRight: '1rem', color: 'green' }}>
                                    </h6>
                                </>
                            ) : (
                                <p>Không tìm thấy người dùng.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Search;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CongDong.module.css';
import Friends from '../User/Friend/Friends';
import Post from '../User/Post/Post.js';
import tu from '../../Images/Icons/Tu.jpeg';
import viet from '../../Images/Icons/Viet.jpeg';
import bao from '../../Images/Icons/Bao.jpeg';
import dinh from '../../Images/Icons/Dinh.png';

function CongDong() {
    const cookies = document.cookie;
    const cookiesArray = cookies.split('; ');
    const userIdCookie = cookiesArray.find(cookie => cookie.startsWith('User_ID='));
    const user_ID = userIdCookie ? userIdCookie.split('=')[1] : null;
    const [posts, setPosts] = useState([]);
    const [topUsers, setTopUsers] = useState([]);
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

    const handleUserClick = (userId) => {
        navigate(`/User?user_id=${userId}`);
    };

    const handleSearch = () => {
        if (searchInput.trim() === '') {
            alert('Vui lòng nhập vào trường này');
        } else {
            navigate(`/Search?post_info=${searchInput}&user_info=${searchInput}`);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
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
                                Hiện chưa có bài viết nào.
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
                    <div className={styles.container3}>
                        <h6 style={{ marginLeft: '0.3rem', fontWeight: '', fontSize: '1.2rem' }}>Top người nổi bật</h6>
                        {topUsers.map(user => (
                            <div style={{ cursor: 'pointer' }} key={user.id} className={styles['container3-info']} onClick={() => handleUserClick(user.id)}>
                                <img alt={user.username} src={user.image}></img>
                                <div className={styles['container3-content']}>
                                    <h6 style={{ fontWeight: 'revert-layer', fontSize: '1rem' }}>{user.username}{user.check == 1 && <i className="fa-solid fa-circle-check" style={{ color :"#258e31",fontSize : '0.8rem',marginLeft : '0.2rem' }}></i>}</h6>
                                    <p>{user.total_following} người theo dõi</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {user_ID != null && 
                    <div className={styles.container4}>
                        <h6 style={{ marginLeft: '1rem', fontWeight: '', fontSize: '1.2rem' }}>Gợi ý cho bạn</h6>
                        <Friends User_ID={user_ID} />
                        <h6 style={{ textAlign : 'right', marginRight: '1rem', color: 'green' }}>
                            Xem thêm <i className="fa-solid fa-circle-arrow-right"></i>
                        </h6>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default CongDong;
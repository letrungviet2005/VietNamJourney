import React, { useEffect, useState } from 'react';
import './CongDong.css';
import Friends from '../User/Friend/Friends';
import Post from '../User/Post/Post.js';
import tu from '../../Images/Icons/Tu.jpeg'
import viet from '../../Images/Icons/Viet.jpeg'
import bao from '../../Images/Icons/Bao.jpeg'
import dinh from '../../Images/Icons/Dinh.png'
import { useNavigate } from 'react-router-dom';

function CongDong() {
    const cookies = document.cookie;
    const cookiesArray = cookies.split('; ');
    const userIdCookie = cookiesArray.find(cookie => cookie.startsWith('User_ID='));
    const user_ID = userIdCookie ? userIdCookie.split('=')[1] : null;
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const handleAvatarClick = (x) => {
        navigate(`/User?user_id=${x}`);
    };


    useEffect(() => {
            fetch('http://localhost/BWD/vietnamjourney/Server/CongDong/Post.php', {
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

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <div className="container1 sticky-search-bar">
                        <input type="text" placeholder="Tìm kiếm ai đó..." />
                        <i class="fa-solid fa-magnifying-glass" style={{ cursor :'pointer' }}></i>
                    </div>
                    <div className="container2">
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
                                    avatar={post.avatar ? `data:image/jpeg;base64,${post.avatar}` : null}
                                    name={post.name}
                                    time={post.createdAt}
                                    content={post.content}
                                    image={post.image ? `data:image/jpeg;base64,${post.image}` : null}
                                    likes={post.likes}
                                    comments={post.comments}
                                />
                            ))
                        )}
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="container3">
                        <p style={{ marginLeft: '0.3rem', fontWeight: 'revert', fontSize: '1.2rem' }}>Top người nổi bật</p>
                        <div onClick={() => handleAvatarClick(1)} className="container3-info">
                        <img alt="test" src={viet}></img>
                        <div className="container3-content">
                            <h6> @vietlee_2005</h6>
                            <p>3 người theo dõi</p>
                            </div>
                            </div>

                        <div onClick={() => handleAvatarClick(4)} className="container3-info">
                        <img alt="test" src={tu}></img>
                        <div className="container3-content">
                            <h6> @anh_tu</h6>
                            <p>3 người theo dõi</p>
                        </div>
                        </div>

                        <div onClick={() => handleAvatarClick(3)} className="container3-info">
                        <img alt="test" src={bao}></img>
                        <div className="container3-content">
                            <h6> @boi_ma</h6>
                            <p>3 người theo dõi</p>
                        </div>
                        </div>

                        <div onClick={() => handleAvatarClick(2)} className="container3-info">
                        <img alt="test"   src={dinh}></img>
                        <div className="container3-content">
                            <h6> @duong_dinh</h6>
                            <p>3 người theo dõi</p>
                        </div>
                        </div>
                    </div>
                    {user_ID != null && 
                    <div className="container4">
                        <p style={{ marginLeft: '1rem', fontWeight: 'revert', fontSize: '1.2rem' }}>Gợi ý cho bạn</p>
                        <Friends User_ID={user_ID} />
                        <h6 style={{ textAlign : 'right',marginRight: '1rem', color: 'green' }}>
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
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './User.module.css';
import tu from '../../Images/Icons/Tu.jpeg';
import Friends from './Friends.js';
import Post from './Post.js';
import Information from './Information.js';

function User() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user_id = searchParams.get('user_id'); // Lấy giá trị của user_id từ query parameter
  
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user_id) {
      fetch('http://localhost/BWD/vietnamjourney/Server/User/Post_User.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user_id }) 
      })
      .then(response => response.json())
      .then(data => {
        setPosts(data.posts); 
      })
      .catch(error => console.error('Error:', error));
    }
  }, [user_id]);

  return (
    <div className="container" style={{ marginTop: '1rem' }}>
      <div className="row">
        <div className="col-md-4 col-lg-4">
          <Information user_ID={user_id} />
          <div className={styles.container2}>
            <p style={{ marginLeft: '1rem', fontWeight: 'bold' }}> Gợi ý cho bạn</p>
            <Friends imgSrc={tu} username="anh_tu" />
            <Friends imgSrc={tu} username="anh_tu" />
          </div>
        </div>
        <div className="col-md-8 col-lg-8">
          <div className={styles.container3}>
            <div className={styles['container3-top']}>
              <div className={styles['container3-top-avatar']}>
                <img src={posts.avatar} alt="Avatar" />
              </div>
              <button>Hãy viết gì đó cho bài viết của bạn</button>
            </div>
          </div>
          <hr className={styles['black-line']} />
          <div className={styles.container4}>
  {posts.length === 0 ? (
              <div style={{ textAlign: 'center', marginTop: '2rem', backgroundColor: 'white', borderRadius :'10px' }}>Chưa có bài viết nào</div>
  ) : (
    posts.map(post => (
      <Post
        key={post.id}
        Post_ID={post.id}
        avatar={post.avatar}
        name="Lê Trung Việt"
        time={post.createdAt}
        content={post.content}
        image={post.image}
        likes={post.likes}
        comments={post.comments}
        isLike={post.isLike}
      />
    ))
  )}
</div>
        </div>
      </div>
    </div>
  );
}

export default User;
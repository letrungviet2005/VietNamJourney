import React, { useEffect, useState } from 'react';
import styles from './User.module.css';
import anhchiendich from '../../Images/User/anhchiendich.png';
import f4 from '../../Images/User/FourStarts.jpg';
import viet from '../../Images/Icons/Viet.jpeg';
import tu from '../../Images/Icons/Tu.jpeg';
import Friends from './Friends.js';
import Post from './Post.js';

function User() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost/BWD/vietnamjourney/Server/backend.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: 1 }) // Gửi dữ liệu cần thiết
    })
    .then(response => response.json())
    .then(data => {
      setPosts(data.posts); // Giả sử phản hồi chứa danh sách bài viết
    })
    .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="container" style={{ marginTop: '1rem' }}>
      <div className="row">
        <div className="col-md-4 col-lg-4">
          <div className={styles.container1}>
            <div className={styles['container1-background']}></div>
            <div className={styles['container1-avatar']}><img src={viet} alt="Avatar" /></div>
            <div className={styles['container1-information']}>
              <div className={styles['container1-information-name']}>Lê Trung Việt</div>
              <div className={styles['container1-information-linkuser']}>@vietle_2005</div>
              <div className={styles['container1-information-content']}>
                <p><i className="fa-solid fa-user-group"></i> 3 follower - 3 following</p>
                <p><i className="fa-solid fa-building"></i> Đồng sáng lập VietNamJourney</p>
                <p><i className="fa-solid fa-location-dot"></i> Sống tại Đà Nẵng</p>
                <p><i className="fa-brands fa-facebook"></i> Link_to_facebook</p>
                <p><i className="fa-solid fa-ellipsis"></i> Xem thêm thông tin về Việt</p>
                <button>Chỉnh sửa trang cá nhân</button>
              </div>
            </div>
          </div>
          <div className={styles.container2}>
            <p style={{ marginLeft: '1rem',fontWeight : 'bold' }}> Gợi ý cho bạn</p>
            <Friends 
              imgSrc={tu} 
              username="anh_tu" 
            />
            <Friends 
              imgSrc={tu} 
              username="anh_tu" 
            />
          </div>
        </div>
        <div className="col-md-8 col-lg-8">
          <div className={styles.container3}>
            <div className={styles['container3-top']}>
              <div className={styles['container3-top-avatar']}>
                <img src={viet} alt="Avatar" />
              </div>
              <button>Hãy viết gì đó cho bài viết của bạn</button>
            </div>
          </div>
          <hr className={styles['black-line']} />
          <div className={styles.container4}>
            {posts.map((post, index) => (
              <Post
                key={index}
                avatar={viet}
                name="Lê Trung Việt"
                time={post.time}
                content={post.content}
                hashtags={post.hashtags}
                image={post.image}
                likes={post.likes}
                comments={post.comments}
                shares={post.shares}
                isLike={post.isLike}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
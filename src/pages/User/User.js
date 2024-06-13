import React from 'react';
import styles from './User.module.css';
import anhchiendich from '../../Images/User/anhchiendich.png';
import f4 from '../../Images/User/FourStarts.jpg';
import viet from '../../Images/Icons/Viet.jpeg';
import tu from '../../Images/Icons/Tu.jpeg';
import Friends from './Friends.js';
import Post from './Post.js';

function User() {
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
          <Post
    avatar={viet}
    name="Lê Trung Việt"
    time="6 giờ trước"
    content="Chiến dịch này tôi đã tham gia cách đây 2 tháng về trước, chuyến đi đã cho tôi những trải nghiệm khó quên với những người bạn. Hy vọng mọi điều sẽ tốt đẹp đến với mọi người."
    hashtags="#VIETNAM_JOURNEY #VIETNAMXANH"
    image={anhchiendich}
    likes={13}
    comments={1}
    shares={2}
    isLike={true}
    />
            <Post
              avatar={viet}
              name="Lê Trung Việt"
              time="6 giờ trước"
              content="Có vẻ như ... nhà vô địch BWD 2024 đã lộ diện."
              hashtags="#VIETNAM_JOURNEY #VIETNAMXANH"
              image={f4}
              likes={26}
              comments={5}
              shares={7}
              isLike={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
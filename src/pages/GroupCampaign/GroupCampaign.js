import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './GroupCampaign.module.css';
import Post from '../User/Post/PostGroup.js';
import NewPostGroup from './NewPostGroup/NewPostGroup.js'
import dinh from '../../Images/Icons/Dinh.png';
import logo from '../../Images/User/anhchiendich.png';

function GroupCampaign() {
    const cookies = document.cookie;
    const cookiesArray = cookies.split('; ');
    const userIdCookie = cookiesArray.find(cookie => cookie.startsWith('User_ID='));
    const user_ID = userIdCookie ? userIdCookie.split('=')[1] : null;

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const group_id = params.get('group_id');
    const [posts, setPosts] = useState([]);
    const [campaignInfo, setCampaignInfo] = useState({});
    const [searchInput, setSearchInput] = useState('');
    const [campaignuser, setCampaignuser] = useState([]);
    const [isMember, setIsMember] = useState(false);
      const [isPostOpen, setIsPostOpen] = useState(false);
    const navigate = useNavigate();

    const handlePost = () => {
    setIsPostOpen(!isPostOpen);
  }

    useEffect(() => {
        if (group_id) {
            fetch('http://localhost:8000/api/getCampaignPosts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ campaign_id: group_id })
            })
            .then(response => response.json())
            .then(data => {
                setPosts(data.posts || []);
            })
            .catch(error => console.error('Error:', error));
            
            fetch('http://localhost:8000/api/getInformationCampaign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ campaign_id: group_id })
            })
            .then(response => response.json())
            .then(data => {
                const campaign = data.campaign || {};
                setCampaignInfo(campaign);

                // Kiểm tra xem user_ID có trong danh sách tình nguyện viên không
                const isMember = campaign.volunteers && campaign.volunteers.some(volunteer => volunteer.userID.toString() === user_ID);
                setIsMember(isMember);
            })
            .catch(error => console.error('Error:', error));
        }
    }, [group_id, user_ID]);

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
    }

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
                <div className={`col-md-3 ${styles.mobile}`}>
                    <div className={styles.sticky}>
                    <div className={styles.containergroupuser}>
                            <p style={{ fontWeight: 'bold', fontSize: '1.6rem', marginBottom: '0.4rem',}}>Nhóm</p>
                            <input type='text' placeholder='Tìm kiếm nhóm' />
                            <hr className={styles['black-line']} style={{ width: '90%', }} />
                            <p style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '0.4rem', }}>Nhóm bạn đã tham gia</p>
                            <div className={styles.group}>
                                {campaignuser.map(campaign => (
                                    <div style={{ cursor: 'pointer', }} key={campaign.id} className={styles.groupline} onClick={() => handleGroupClick(campaign.id)}>
                                        <img alt={campaign.name} src={campaign.image_url}></img>
                                        <div className={styles.grouplineinfo} style={{ maxWidth: '15rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            <h6 style={{ fontWeight: 'revert', fontSize: '1rem' }}>{campaign.name}</h6>
                                            <p>{campaign.province}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-9">
                    <div className={styles.containerhead}>
                        <img alt="logo" src={campaignInfo.image}></img>
                        <div className={styles.containerheadinfo}>
                            <div className={styles.containerheadinfo1}>
                                <p style={{ fontWeight : 'bold', fontSize : '2rem', marginBottom : '0',lineHeight : '120%' }}>{campaignInfo.name}</p>
                                <span><i className="fa-solid fa-earth-americas"></i> Nhóm công khai - {campaignInfo.volunteer_count} thành viên</span>
                            </div>
                            {isMember && (
                                <div className={styles.containerheadinfo2}>
                                    <button><i className="fa-solid fa-share"></i> Chia sẻ</button>
                                    <button>Nhóm chat</button>
                                    <button>Chiến dịch</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className={`${styles.container1} ${!isMember ? styles.hidden : ''}`}>
                                <img alt="name" src={campaignInfo.image}></img>
                                <button onClick={handlePost}>Bạn có thông tin gì mới cho nhóm không...</button>
                                 {isPostOpen && <NewPostGroup onClose={handlePost} campaign_id={group_id} />}
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
                                            avatargroup={campaignInfo.image}
                                            namegroup={campaignInfo.name}
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
                        <div className={`col-md-4 ${styles.mobile}`}>
                            <div className={styles.container3}>
                                <div className={styles.sticky}>
                                    <h6 style={{ marginLeft: '0.3rem', fontWeight: '', fontSize: '1.2rem' }}>Thành viên của nhóm</h6>
                                    {campaignInfo.volunteers && campaignInfo.volunteers.length > 0 ? (
                                        campaignInfo.volunteers.map((volunteer, index) => (
                                            <div style={{ cursor: 'pointer' }} key={index} className={styles['container3-info']} onClick={() => handleUserClick(volunteer.userID)}>
                                                <img alt={volunteer.name} src={volunteer.image}></img>
                                                <div className={styles['container3-content']}>
                                                    <h6 style={{ fontWeight: 'revert-layer', fontSize: '1rem' }}>{volunteer.name}</h6>
                                                    <p style={{fontSize :'0.9rem',fontWeight :'500'}}>Tham gia từ {new Date(volunteer.created_at).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Không có tình nguyện viên nào</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroupCampaign;
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Skeleton } from 'antd';
import styles from './GroupCampaign.module.css';
import Post from '../User/Post/PostGroup.js';
import NewPostGroup from './NewPostGroup/NewPostGroup.js';
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
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [loadingCampaignInfo, setLoadingCampaignInfo] = useState(true);
    const navigate = useNavigate();

    const handlePost = () => {
        setIsPostOpen(!isPostOpen);
    };

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
                setLoadingPosts(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoadingPosts(false);
            });
            
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
                setLoadingCampaignInfo(false);

                const isMember = campaign.volunteers && campaign.volunteers.some(volunteer => volunteer.userID.toString() === user_ID);
                setIsMember(isMember);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoadingCampaignInfo(false);
            });
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
    };

    const handleSearch = () => {
        if (searchInput.trim() === '') {
            alert('Vui lòng nhập vào trường này');
        } else {
            navigate(`/Search?post_info=${searchInput}&user_info=${searchInput}`);
        }
    };

    const handleShare = () => {
        const shareLink = `${window.location.origin}/VietNamJourney#/campaign-detail/?id=${group_id}`;
        navigator.clipboard.writeText(shareLink)
            .then(() => {
                alert('Link đã được sao chép vào bộ nhớ tạm!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };
    
    const handleChat = () => {
        navigate(`/Messenger?type=group&group_id=${group_id}`);
    };
    
    const handleVolunteer = () => {
        navigate(`/campaign-detail/?id=${group_id}`);
    };

    return (
        <div className={styles.container}>
            <div className="row">
                <div className={`col-md-3 ${styles.mobile}`}>
                    <div className={styles.sticky}>
                        <div className={styles.containergroupuser}>
                            <p style={{ fontWeight: 'bold', fontSize: '1.6rem', marginBottom: '0.4rem' }}>Nhóm</p>
                            <input type='text' placeholder='Tìm kiếm nhóm' />
                            <hr className={styles['black-line']} style={{ width: '90%' }} />
                            <p style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '0.4rem' }}>Nhóm bạn đã tham gia</p>
                            <div className={styles.group}>
                                {campaignuser.length === 0 ? (
                                    <Skeleton active />
                                ) : (
                                    campaignuser.map(campaign => (
                                        <div style={{ cursor: 'pointer' }} key={campaign.id} className={styles.groupline} onClick={() => handleGroupClick(campaign.id)}>
                                            <img alt={campaign.name} src={campaign.image_url}></img>
                                            <div className={styles.grouplineinfo}>
                                                <h6 className={styles.campaignTitle}>{campaign.name}</h6>
                                                <p className={styles.campaignProvince}>{campaign.province}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-9">
                    <div className={styles.containerhead}>
                        {loadingCampaignInfo ? (
                            <Skeleton.Image style={{ width: 200, height: 200 }} />
                        ) : (
                            <img alt="logo" src={campaignInfo.image}></img>
                        )}
                        <div className={styles.containerheadinfo}>
                            <div className={styles.containerheadinfo1}>
                                {loadingCampaignInfo ? (
                                    <>
                                        <Skeleton.Input style={{ width: 300 }} active />
                                        <Skeleton.Input style={{ width: 200 }} active />
                                    </>
                                ) : (
                                    <>
                                        <p style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '0.4rem', lineHeight: '120%' }}>{campaignInfo.name}</p>
                                        <span><i className="fa-solid fa-earth-americas"></i> Nhóm công khai - {campaignInfo.volunteer_count} thành viên</span>
                                    </>
                                )}
                            </div>
                            {isMember && (
                                <div className={styles.containerheadinfo2}>
                                    <button onClick={() => handleShare()}><i className="fa-solid fa-share"></i> Chia sẻ</button>
                                    <button onClick={() => handleChat()}>Nhóm chat</button>
                                    <button onClick={() => handleVolunteer()}>Chiến dịch</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className={`${styles.container1} ${!isMember ? styles.hidden : ''}`}>
                                {loadingCampaignInfo ? (
                                    <Skeleton.Image style={{ width: 50, height: 50 }} />
                                ) : (
                                    <img alt="name" src={campaignInfo.image}></img>
                                )}
                                <button onClick={handlePost}>Bạn có thông tin gì mới cho nhóm không...</button>
                                {isPostOpen && <NewPostGroup onClose={handlePost} campaign_id={group_id} />}
                            </div>
                            <div className={styles.container2}>
                                {loadingPosts ? (
                                    <Skeleton active paragraph={{ rows: 4 }} />
                                ) : posts.length === 0 ? (
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
                                    {loadingCampaignInfo ? (
                                        <Skeleton active paragraph={{ rows: 4 }} />
                                    ) : campaignInfo.volunteers && campaignInfo.volunteers.length > 0 ? (
                                        campaignInfo.volunteers.map((volunteer, index) => (
                                            <div style={{ cursor: 'pointer' }} key={index} className={styles['container3-info']} onClick={() => handleUserClick(volunteer.userID)}>
                                                <img alt={volunteer.name} src={volunteer.image}></img>
                                                <div className={styles['container3-content']}>
                                                    <h6 style={{ fontWeight: '600', fontSize: '1rem' }}>{volunteer.name}</h6>
                                                    <p style={{fontSize :'0.9rem',fontWeight :'600'}}>Tham gia từ {new Date(volunteer.created_at).toLocaleDateString()}</p>
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
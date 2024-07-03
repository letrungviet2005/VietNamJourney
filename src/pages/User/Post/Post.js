import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Post.module.css';
import dots from '../../../Images/User/dots.png';
import CommentModal from '../CommentModal/CommentModal';

const Post = ({ 
    Post_ID,
    avatar, 
    user_id,
    name, 
    time, 
    content, 
    image, 
    likes, 
    comments, 
    isLike 
}) => {
    const [isLiked, setIsLiked] = useState(isLike);
    const [likeCount, setLikeCount] = useState(likes);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [comment, setComment] = useState(null); 
    const navigate = useNavigate();
    const cookies = document.cookie;
    const cookiesArray = cookies.split('; ');
    const userIdCookie = cookiesArray.find(cookie => cookie.startsWith('User_ID='));
    const userId = userIdCookie ? userIdCookie.split('=')[1] : null;

    useEffect(() => {

        if (userId) {
            fetch('http://localhost:8000/api/checkLikeStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Post_ID, user_id: userId }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.isLiked !== undefined) {
                    setIsLiked(data.isLiked);
                } else {
                    setIsLiked(false);
                }
            })
            .catch(error => {
                console.error('Error checking like status:', error);
                setIsLiked(false);
            });

            fetch('http://localhost:8000/api/getComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Post_ID }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.comment) {
                    setComment(data.comment);
                } else {
                    setComment(null);
                }
            })
            .catch(error => {
                console.error('Error fetching comment:', error);
            });
        } else {
            setIsLiked(false);
        }
    }, [Post_ID]);

    const handleLikeClick = () => {
        if (userId) {
            fetch('http://localhost:8000/api/toogleLike', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Post_ID, user_id: userId, isLike: !isLiked }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    if (isLiked) {
                        setLikeCount(likeCount - 1);
                    } else {
                        setLikeCount(likeCount + 1);
                    }
                    setIsLiked(!isLiked);
                } else {
                    console.error('Error updating like status:', data.error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            navigate('/TaiKhoan');
        }
    };

    const handleCommentClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAvatarClick = () => {
        navigate(`/User?user_id=${user_id}`);
    };

    const handleDotsClick = () => {
        setIsOptionsOpen(!isOptionsOpen);
    };

    const handleDeleteClick = () => {
        setIsOptionsOpen(false);
        setIsDeleteOverlayOpen(true);
    };

    const handleConfirmDelete = () => {
        fetch('http://localhost:8000/api/deletePost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Post_ID }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.reload();
            } else {
                console.error('Error deleting post:', data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleCancelDelete = () => {
        setIsDeleteOverlayOpen(false);
    };

    return (
        <div className={styles['container-post']}>
            <div className={styles['post-header']}>
                <div className={styles['post-header-avatar']} onClick={handleAvatarClick} style={{ cursor: 'pointer' }}>
                    <img src={avatar} alt="avatar" />
                </div>
                <div className={styles['post-header-info']}>
                    <h6 onClick={handleAvatarClick} style={{ cursor: 'pointer', fontWeight: 'revert' }}>{name}</h6>
                    <span style={{ fontSize: '0.8rem' }}>{time} · <i className="fas fa-earth-asia"></i></span>
                </div>
                <div className={styles['post-header-option']} onClick={handleDotsClick} style={{ cursor: 'pointer' }}>
                    <img alt="options" src={dots} />
                    {isOptionsOpen && (
                        <div className={styles['options-menu']}>
                            <p>Chia sẻ</p>
                            {user_id == userId &&
                                <p onClick={handleDeleteClick}>Xóa bài viết</p>
                            }
                        </div>
                    )}
                </div>
            </div>
            <div className={styles['post-content']}>
                <p>{content}</p>
            </div>
            {image && <div className={styles['post-body']}>
                <img src={image} alt="post content" />
            </div>}
            <div className={styles['post-footer']}>
                <div className={styles['post-footer-top']}>
                    <p><span style={{ fontWeight: 'bold' }}>{likeCount}</span> lượt thích </p>
                    <p style={{ marginLeft: '0.2rem', marginRight: '0.2rem', fontWeight: 'bold' }}> · </p>
                    <p><span style={{ fontWeight: 'bold' }}>{comments}</span> bình luận</p>
                </div>
                <hr className={styles['black-line']}  />
                <div className={styles['post-footer-middle']}>
                    <p onClick={handleLikeClick} style={{ cursor: 'pointer' }}>
                        <i className={isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i> like
                    </p>
                    <p onClick={handleCommentClick} style={{ cursor: 'pointer' }}>
                        <i className="fa-regular fa-comment"></i> comment
                    </p>
                </div>
                {comment && (
                    <div onClick={handleCommentClick} style={{ cursor: 'pointer' }} className={styles['post-footer-footer']}>
                        <img style={{ objectFit : 'cover' }} src={`data:image/jpeg;base64,${comment.Image}`} alt="comment avatar" />
                        <div className={styles['post-footer-footer-right']}>
                            <div className={styles['post-footer-footer-content']}>
                                <h6 style={{ fontWeight: 'revert' }}>{comment.Name}</h6>
                                <p style={{ marginLeft :'0.1rem' , fontSize :' 1rem' }}>{comment.Content}</p>
                                {comment.ImageComment && <img src={`data:image/jpeg;base64,${comment.ImageComment}`} alt="comment content" />}
                            </div>
                            <span style={{ fontSize: '0.8rem',marginLeft :'0.2rem' }}>{comment.CreateAt}</span>
                        </div>
                    </div>
                )}
            </div>
            {isModalOpen && <CommentModal onClose={handleCloseModal} postId={Post_ID} />}
            {isDeleteOverlayOpen && (
                <div className={styles['overlay']}>
                    <div className={styles['overlay-content']}>
                        <p>Bạn có chắc muốn xóa bài viết này không?</p>
                        <button onClick={handleConfirmDelete}>Đồng ý</button>
                        <button onClick={handleCancelDelete}>Hủy</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Post;
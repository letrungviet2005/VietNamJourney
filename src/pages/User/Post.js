import React, { useState } from 'react';
import styles from './Post.module.css';
import dots from '../../Images/User/dots.png';
import CommentModal from './CommentModal/CommentModal'; 

const Post = ({ 
    Post_ID,
    avatar, 
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

    const handleLikeClick = () => {
        if (isLiked) {
            setLikeCount(likeCount - 1);
        } else {
            setLikeCount(likeCount + 1);
        }
        setIsLiked(!isLiked);
    };

    const handleCommentClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles['container-post']}>
            <div className={styles['post-header']}>
                <div className={styles['post-header-avatar']}>
                    <img src={avatar} alt="avatar" />
                </div>
                <div className={styles['post-header-info']}>
                    <h5>{name}</h5>
                    <span style={{ fontSize: '0.8rem' }}>{time} · <i className="fas fa-earth-asia"></i></span>
                </div>
                <div className={styles['post-header-option']}>
                    <img alt="options" src={dots} />
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
                    <p><span style={{ fontWeight : 'bold'  }}>{likeCount}</span> lượt thích </p>
                    <p style={{ marginLeft : '0.2rem',marginRight : '0.2rem',fontWeight : 'bold' }}> · </p>
                    <p><span style={{ fontWeight : 'bold'  }}>{comments}</span> bình luận</p>
                </div>
                <hr className={styles['black-line']} style={{ marginLeft: '2rem', marginTop: '0' }} />
                <div className={styles['post-footer-middle']}>
                    <p onClick={handleLikeClick} style={{ cursor: 'pointer' }}>
                        <i className={isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i> like
                    </p>
                    <p onClick={handleCommentClick} style={{ cursor: 'pointer' }}>
                        <i className="fa-regular fa-comment"></i> comment
                    </p>
                </div>
            </div>
            {isModalOpen && <CommentModal onClose={handleCloseModal} postId={Post_ID} />}
        </div>
    );
};

export default Post;
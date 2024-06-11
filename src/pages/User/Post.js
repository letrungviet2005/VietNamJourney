import React from 'react';
import styles from './Post.module.css';
import dots from '../../Images/User/dots.png'

const Post = ({ avatar, name, time, content, hashtags, image, likes, comments, shares, commenterAvatar, commenterName, commentTime, commentText }) => {
    return (
        <div className={styles['container-post']}>
            <div className={styles['post-header']}>
                <div className={styles['post-header-avatar']}>
                    <img src={avatar} alt="avatar" />
                </div>
                <div className={styles['post-header-info']}>
                    <h5>{name}</h5>
                    <span style={{fontSize : '0.8rem'}}>{time}  <i className="fa-solid fa-earth-asia"></i></span>
                </div>
                <div className={styles['post-header-option']}>
                    <img alt="options" src={dots} />
                </div>
            </div>
            <div className={styles['post-content']}>
                <p>{content}</p>
                <p style ={{color : 'green'}}>{hashtags}</p>
            </div>
            <div className={styles['post-body']}>
                <img src={image} alt="post content" />
            </div>
            <div className={styles['post-footer']}>
                <div className={styles['post-footer-top']}>
                    <p>{likes} lượt thích </p>
                    <p> - </p>
                    <p>{comments} bình luận</p>
                    <p style={{ marginLeft: 'auto' }}> {shares} lượt chia sẻ</p>
                </div>
                <hr className={styles['black-line']} style={{ marginLeft: '2rem', marginTop: '0' }} />
                <div className={styles['post-footer-middle']}>
                    <p><i className="fa-regular fa-heart"></i> like</p>
                    <p><i className="fa-regular fa-comment"></i> comment</p>
                    <p><i className="fa-regular fa-paper-plane"></i> share</p>
                </div>
                <div className={styles['post-footer-bottom']}>
                    <img alt="commenter avatar" src={commenterAvatar} />
                    <div className={styles['post-footer-bottom-comment']}>
                        <div className={styles['post-footer-bottom-comment-top']}>
                            <p style={{fontWeight :'bold'}}>{commenterName} </p>
                            <p style={{ marginLeft: '0.2rem' }}> - {commentTime}</p>
                            <div className={styles['post-footer-bottom-comment-top-option']}>
                                <img alt="options" src={dots} />
                            </div>
                        </div>
                        <div className={styles['post-footer-bottom-comment-body']}>
                            <p>{commentText}</p>
                            <div className={styles['post-footer-bottom-comment-body-like']}>
                                <i className="fa-regular fa-heart"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
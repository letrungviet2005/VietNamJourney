import React, { useEffect, useState } from 'react';
import styles from './CommentModal.module.css';
import { useNavigate } from 'react-router-dom';

const CommentModal = ({ onClose, postId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch('http://localhost/BWD/vietnamjourney/Server/User/Post_Comment.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ post_ID: postId }),
                });
                const data = await response.json();
                
                if (data.comments) {
                    setComments(data.comments);
                } else {
                    setComments([]);
                }

                setLoading(false);
            } catch (error) {
                setError('Error fetching comments');
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId]);

    const handleAvatarClick = (userId) => {
        navigate(`/User?user_id=${userId}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}><i className="fas fa-times"></i></button>
                <hr className={styles['black-line']} />
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className={styles.modalContent}>
                            <img 
                                src={comment.avatar} 
                                alt="Avatar" 
                                onClick={() => handleAvatarClick(comment.user_ID)} 
                                style={{ cursor: 'pointer' }} 
                            />
                            <div className={styles.ContentRight}>
                                <div className={styles.modalContentinfo}>
                                    <h6 
                                        style={{ cursor: 'pointer' }} 
                                        onClick={() => handleAvatarClick(comment.user_ID)}
                                    >
                                        {comment.username}
                                    </h6>
                                    <p>{comment.content}</p>
                                </div>
                                <p style={{ fontSize : '13px' }} className={styles.time}>{comment.time}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign : 'center' }}>Hiện có bình luận nào</div>
                )}
                <div className={styles.event}>
                    <i className="fa-regular fa-image"></i>
                    <input type="text" placeholder="Hãy viết gì đó..." />
                    <i className="fa-regular fa-paper-plane"></i>
                </div>
            </div>
        </div>
    );
};

export default CommentModal;
import React, { useEffect, useState } from 'react';
import styles from './CommentModal.module.css';

const CommentModal = ({ onClose, postId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                            <img src={comment.avatar} alt="Avatar" />
                            <div className={styles.ContentRight}>
                            <div className={styles.modalContentinfo}>
                                <h6>{comment.username}</h6>
                                <p>{comment.content}</p>
                                </div>
                                <p className={styles.time}>{comment.time }</p>
                                </div>
                        </div>
                    ))
                ) : (
                    <div>Hiện có bình luận nào</div>
                )}
                <div className={styles.event}>
                    <i className="fa-regular fa-image"></i>
                    <input type="text" placeholder="Hãy viết gì đó..."></input>
                    <i class="fa-regular fa-paper-plane"></i>
                    </div>
            </div>
        </div>
    );
};

export default CommentModal;
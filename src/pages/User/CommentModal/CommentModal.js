import React, { useEffect, useState } from 'react';
import styles from './CommentModal.module.css';
import { useNavigate } from 'react-router-dom';
import { useCheckCookie } from '../../../Cookie/getCookie';

const CommentModal = ({ onClose, postId }) => {
    const user_ID = useCheckCookie('User_ID', '/TaiKhoan');
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commentContent, setCommentContent] = useState('');
    const [commentImage, setCommentImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/getComments', {
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

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');

        socket.onopen = () => {
            console.log('WebSocket connection opened');
        };

        socket.onmessage = (event) => {
            const comment = JSON.parse(event.data);
            setComments((prevComments) => [comment, ...prevComments]);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            socket.close();
        };
    }, []);

    const handleAvatarClick = (userId) => {
        navigate(`/User?user_id=${userId}`);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setCommentImage(file);
    };

    const sendComment = async () => {
        if (!commentContent.trim() && !commentImage) {
            return;
        }

        const formData = new FormData();
        formData.append('User_ID', user_ID);
        formData.append('Post_ID', postId);
        formData.append('Content', commentContent);
        if (commentImage) {
            formData.append('ImageComment', commentImage);
        }

        try {
            const response = await fetch('http://localhost:8000/api/addComment', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (data.success) {
                const socket = new WebSocket('ws://localhost:8080');
                socket.onopen = () => {
                    socket.send(JSON.stringify(data.comment));
                };

                setComments([data.comment, ...comments]);
                setCommentContent('');
                setCommentImage(null);
            } else {
                alert(`Failed to add comment: ${data.error}`);
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
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
                <div className={styles.modalContentWrapper}>
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
                                        {comment.imageComment && (
                                            <div className={styles.commentContent}>
                                                <img src={`http://localhost:8000/${comment.imageComment}`} alt="Comment Content" />
                                            </div>
                                        )}
                                    </div>
                                    <p style={{ fontSize: '13px' }} className={styles.time}>{comment.time}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ textAlign: 'center' }}>Hiện chưa có bình luận nào</div>
                    )}
                </div>
                <div className={styles.event}>
                    <div className={styles['event-head']}>
                        <label htmlFor="image-upload">
                            <i className="fa-regular fa-image"></i>
                        </label>
                        <input 
                            id="image-upload" 
                            type="file" 
                            style={{ display: 'none' }} 
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                        <input 
                            type="text" 
                            placeholder="Hãy viết gì đó..." 
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                        />
                        <i onClick={sendComment} className="fa-regular fa-paper-plane"></i>
                    </div>
                    {commentImage && <img src={URL.createObjectURL(commentImage)} alt="Selected" />}
                </div>
            </div>
        </div>
    );
};

export default CommentModal;
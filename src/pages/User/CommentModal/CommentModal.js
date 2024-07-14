import React, { useEffect, useState } from 'react';
import styles from './CommentModal.module.css';
import { useNavigate } from 'react-router-dom';
import { useCheckCookie } from '../../../Cookie/getCookie';
import { Skeleton } from 'antd';

const CommentModal = ({ onClose, postId }) => {
    const user_ID = useCheckCookie('User_ID', '/TaiKhoan');
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commentContent, setCommentContent] = useState('');
    const [commentImage, setCommentImage] = useState(null);
    const navigate = useNavigate();
    const [socket, setSocket] = useState(null);

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
        const newSocket = new WebSocket('ws://localhost:8080');

        newSocket.onopen = () => {
            console.log('WebSocket connection opened');
            newSocket.send(JSON.stringify({ type: 'subscribe', post_ID: postId }));
        };

        newSocket.onmessage = (event) => {
            try {
                const comment = JSON.parse(event.data);
                if (comment.post_ID === postId) {
                    setComments((prevComments) => [comment, ...prevComments]);
                }
            } catch (e) {
                console.error('Error parsing WebSocket message:', e);
            }
        };

        newSocket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, [postId]);

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
                const newComment = {
                    ...data.comment,
                    avatar: data.comment.user_avatar, // Ensure the avatar is set correctly
                };

                if (socket && socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify({
                        type: 'comment',
                        post_ID: postId,
                        ...newComment,
                    }));
                }
                setComments([newComment, ...comments]);
                setCommentContent('');
                setCommentImage(null);
            } else {
                alert(`Failed to add comment: ${data.error}`);
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}><i className="fas fa-times"></i></button>
                <hr className={styles['black-line']} />
                <div className={styles.modalContentWrapper}>
                    {loading ? (
                        <Skeleton active />
                    ) : error ? (
                        <div>{error}</div>
                    ) : comments.length > 0 ? (
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
                                        <p
                                            style={{ cursor: 'pointer',fontWeight: '600',marginBottom : '0' ,fontSize : '15px' }} 
                                            onClick={() => handleAvatarClick(comment.user_ID)}
                                        >
                                            {comment.username}
                                        </p>
                                        <p style={{ marginBottom : '5px'}}>{comment.content}</p>
                                        {comment.imageComment && (
                                            <div className={styles.commentContent}>
                                                <img src={comment.imageComment} alt="Comment Content" />
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
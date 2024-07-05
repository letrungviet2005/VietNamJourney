import React, { useState } from 'react';
import styles from './NewPost.module.css';
import { useNavigate } from 'react-router-dom';

const NewPost = ({ onClose }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleSubmit = async () => {
        if (!selectedImage && !content) {
            return;
        }

        const cookies = document.cookie;
        const cookiesArray = cookies.split('; ');
        const userIdCookie = cookiesArray.find(cookie => cookie.startsWith('User_ID='));
        const userId = userIdCookie ? userIdCookie.split('=')[1] : null;

        const formData = new FormData();
        formData.append('User_ID', userId);
        formData.append('Content', content);

        if (selectedImage) {
            formData.append('Image', selectedImage);
        }

        try {
            const response = await fetch('http://localhost:8000/api/addPost', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            if (result.success) {
                console.log('Post added successfully');
                onClose(); // Close the modal
                navigate(0); // Refresh the page
            } else {
                console.error('Failed to add post:', result.error);
            }
        } catch (error) {
            console.error('Failed to add post:', error);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles['modal-head']}>
                    <p>Thêm bài viết</p>
                    <i onClick={onClose} className="fas fa-times"></i>
                </div>
                <hr className={styles['black-line']} />
                <div className={styles.modalContentWrapper}>
                    <textarea 
                        placeholder='Bạn đang nghĩ gì vậy...'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <div className={styles['post-body']}>
                        {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Selected" />}
                    </div>
                </div>
                <div className={styles.event}>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        style={{ display: 'none' }} 
                        id="fileInput"
                    />
                    <label htmlFor="fileInput" className={styles.uploadButton}>
                        <i className="fa-regular fa-image"></i>
                    </label>
                    <button onClick={handleSubmit}>Đăng bài viết</button>
                </div>
            </div>
        </div>
    );
};

export default NewPost;
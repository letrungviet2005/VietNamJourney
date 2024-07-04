import React, { useEffect, useState } from 'react';
import './updateInformation.css';

function UpdateInformation({ onCloseInfo, user_id }) {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [facebookLink, setFacebookLink] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [role, setRole] = useState('');
    const [newAvatar, setNewAvatar] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/user_information', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId: user_id })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                if (result.user) {
                    setName(result.user.name || '');
                    setLocation(result.user.location || '');
                    setFacebookLink(result.user.facebookLink || '');
                    setAvatar(result.user.avatar || null);
                    setRole(result.user.role || '');
                } else {
                    console.error('User data not found:', result.error);
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUserData();
    }, [user_id]);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setNewAvatar(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const update = async () => {
        const formData = new FormData();
        formData.append('userId', user_id);
        formData.append('name', name);
        formData.append('location', location);
        formData.append('facebookLink', facebookLink);
        formData.append('role', role);
        if (newAvatar) {
            formData.append('avatar', document.querySelector('input[type="file"]').files[0]);
        }

        try {
            const response = await fetch('http://localhost:8000/api/updateUserInfo', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            if (result.success) {
                console.log('User information updated successfully');
                onCloseInfo();
                window.location.reload();
            } else {
                console.error('Failed to update user information:', result.error);
            }
        } catch (error) {
            console.error('Failed to update user information:', error);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', marginBottom: '1rem', flexDirection: 'column' }}>
                {newAvatar ? (
                    <img
                        src={newAvatar}
                        alt="New Avatar"
                        style={{
                            borderRadius: '50%',
                            width: '7rem',
                            height: '7rem',
                            objectFit: 'cover',
                            marginRight: 'auto',
                            marginLeft: 'auto',
                            border: '2px solid white',
                            marginTop: '-3.7rem',
                            position: 'relative',
                            zIndex: 10
                        }}
                    />
                ) : (
                    avatar && (
                        <img
                            src={avatar}
                            alt="Avatar"
                            style={{
                                borderRadius: '50%',
                                width: '7rem',
                                height: '7rem',
                                objectFit: 'cover',
                                marginRight: 'auto',
                                marginLeft: 'auto',
                                border: '2px solid white',
                                marginTop: '-3.7rem',
                                position: 'relative',
                                zIndex: 10
                            }}
                        />
                    )
                )}
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="fileInput"
                    onChange={handleAvatarChange}
                />
                <label
                    htmlFor="fileInput"
                    style={{
                        width: '5.3rem',
                        height: '1.3rem',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        fontSize: '0.7rem',
                        borderRadius: '10px',
                        border: 'none',
                        backgroundColor: 'green',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        marginTop: '0.5rem'
                    }}
                >
                    + chọn avatar
                </label>
            </div>
            <div className="information">
                <h6 style={{ fontWeight: 'bold' }}>Tên hiển thị</h6>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <h6 style={{ fontWeight: 'bold', marginTop: '1rem' }}>Thông tin</h6>
                <div className="file">
                    <i className="fa-solid fa-location-dot"></i>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div className="file">
                    <i className="fa-solid fa-building"></i>
                    <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
                </div>
                <h6 style={{ fontWeight: 'bold', marginTop: '1rem' }}>Tài khoản mạng xã hội</h6>
                <div className="file">
                    <i className="fa-brands fa-square-facebook"></i>
                    <input type="text" value={facebookLink} onChange={(e) => setFacebookLink(e.target.value)} />
                </div>
                <div className="eventbutton">
                    <button onClick={onCloseInfo}>Hủy</button>
                    <button onClick={update}>Lưu</button>
                </div>
            </div>
        </div>
    );
}

export default UpdateInformation;
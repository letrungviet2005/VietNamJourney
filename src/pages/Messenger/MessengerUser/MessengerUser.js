import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MessengerUser.module.css'
import image from '../../../Images/Icons/Viet.jpeg'



function MessengerUser(user_id) {
    

    return (
        <div className={styles.container} >
            <div className={styles.containeruser}>
                <div className={styles.useravatar}>
                    <img src={image} alt="avatar"></img>
                </div>
                <div className={styles.userinfo}>
                    <h6>Tiêu đề</h6>
                    <p>Đang hoàn báo</p>
                </div>
            </div>

            <div className={styles.containeruser}>
                <div className={styles.useravatar}>
                    <img src={image} alt="avatar"></img>
                </div>
                <div className={styles.userinfo}>
                    <h6>Tiêu đề</h6>
                    <p>Đang hoàn báo</p>
                </div>
            </div>

            <div className={styles.containeruser}>
                <div className={styles.useravatar}>
                    <img src={image} alt="avatar"></img>
                </div>
                <div className={styles.userinfo}>
                    <h6>Tiêu đề</h6>
                    <p>Đang hoàn báo</p>
                </div>
            </div>

            <div className={styles.containeruser}>
                <div className={styles.useravatar}>
                    <img src={image} alt="avatar"></img>
                </div>
                <div className={styles.userinfo}>
                    <h6>Tiêu đề</h6>
                    <p>Đang hoàn báo</p>
                </div>
            </div>

            <div className={styles.containeruser}>
                <div className={styles.useravatar}>
                    <img src={image} alt="avatar"></img>
                </div>
                <div className={styles.userinfo}>
                    <h6>Tiêu đề</h6>
                    <p>Đang hoàn báo</p>
                </div>
            </div>

            <div className={styles.containeruser}>
                <div className={styles.useravatar}>
                    <img src={image} alt="avatar"></img>
                </div>
                <div className={styles.userinfo}>
                    <h6>Tiêu đề</h6>
                    <p>Đang hoàn báo</p>
                </div>
            </div>

            <div className={styles.containeruser}>
                <div className={styles.useravatar}>
                    <img src={image} alt="avatar"></img>
                </div>
                <div className={styles.userinfo}>
                    <h6>Tiêu đề</h6>
                    <p>Đang hoàn báo</p>
                </div>
            </div>

            <div className={styles.containeruser}>
                <div className={styles.useravatar}>
                    <img src={image} alt="avatar"></img>
                </div>
                <div className={styles.userinfo}>
                    <h6>Tiêu đề</h6>
                    <p>Đang hoàn báo</p>
                </div>
            </div>

            <div className={styles.containeruser}>
                <div className={styles.useravatar}>
                    <img src={image} alt="avatar"></img>
                </div>
                <div className={styles.userinfo}>
                    <h6>Tiêu đề</h6>
                    <p>Đang hoàn báo</p>
                </div>
            </div>
        </div>
    );
}
export default MessengerUser;
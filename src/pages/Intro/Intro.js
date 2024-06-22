import React from 'react';
import styles from './Intro.module.css';

import logo from "../../Images/Intro/logo.png";
import playbt from "../../Images/Intro/playbt.png";
import vid1 from "../../Images/Intro/videointro.mp4";



function Intro() {
    return (
        <div className={styles.main}>

            <div className={styles.vid}>
                <video controls>
                    <source src={vid1} type="video/mp4"></source>

                    Your browser doesn't support the video tag
                </video>
            </div>

            <div className={styles.front}>
                <img alt="a" src={logo} className={styles.logo}></img>

                <div className={styles.mid}>
                    <p>Bạn đang chần chờ gì<br></br> hãy đi cùng chúng tôi</p>

                    <img alt="a" src={playbt}></img>
                </div>

                <p className={styles.next}>Tiếp Tục</p>
            </div>

        </div>
    );
}


export default Intro;
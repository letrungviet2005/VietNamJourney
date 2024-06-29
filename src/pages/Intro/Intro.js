import React, { useRef, useState } from 'react';
import styles from './Intro.module.css';
import { Link } from 'react-router-dom';

import playbt from "../../Images/Intro/playbt.png";
// import vid1 from "../../Images/Intro/videointro.mp4";

function Intro() {
    const videoRef = useRef(null);
    const [isMidVisible, setIsMidVisible] = useState(true);

    const playVid = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
        setIsMidVisible(false);
    };

    return (
        <div className={styles.main}>
            <div className={styles.vid}>
                {/* <video id='myvideo' ref={videoRef}>
                    <source src={vid1} type="video/mp4" />
                    Your browser doesn't support the video tag.
                </video> */}
            </div>
            <div className={styles.front}>
                {isMidVisible && (
                    <div className={styles.mid}>
                        <p>Bạn đang chần chờ gì<br /> hãy đi cùng chúng tôi</p>
                        <img alt="a" src={playbt} onClick={playVid} />
                    </div>
                )}
                <Link className={styles.lnk} to="/TrangChu">
                    <p className={styles.next}>Tiếp Tục</p>
                </Link>
            </div>
        </div>
    );
}

export default Intro;

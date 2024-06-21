import styles from './SuMenh3.module.css';
import { Link } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';

import anhBt from '../../../Images/TrangChu/SuMenh3/anhBt.png';
import anhDown from '../../../Images/TrangChu/SuMenh3/anhDown.png';


function CoSuMenh3() {

    // Scrolling animation
    const hiddenElementsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.show);
                }
                //  else {
                //     entry.target.classList.remove(styles.show);
                // }
            });
        });

        hiddenElementsRef.current.forEach((el) => observer.observe(el));

        // Cleanup function to unobserve elements
        // return () => {
        //     hiddenElementsRef.current.forEach((el) => observer.unobserve(el));
        // };
    }, []);



    return(
        <div className={styles.main}>

            <div className={styles.div1}>
                <p>Bắt đầu hành trình với chúng tôi</p>

                <img alt=":[" src={anhDown}></img>
            </div>


            <div className={styles.div2}>
                <div className={styles.txt}>
                    <p>Chúng tôi tạo ra cộng đồng giúp kết nối tất cả mọi người, từ đó cùng chung tay bảo vệ môi trường từ những việc làm nhỏ nhất.</p>
                </div>

                <div className={`${styles.bt} ${styles.hidden}`} ref={(el) => hiddenElementsRef.current.push(el)}>
                    <Link to="/CongDong">
                        <button>Tham gia ngay</button>
                        <img alt=":<" src={anhBt}></img>
                    </Link>
                </div>
            </div>

        </div>
    );
}


export default CoSuMenh3
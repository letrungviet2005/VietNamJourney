import styles from './SuMenh1.module.css';
import React, { useEffect, useRef } from 'react';

import anh1 from '../../../Images/TrangChu/SuMenh1/anh1.png';
import anh2 from '../../../Images/TrangChu/SuMenh1/anh2.png';


function CoSuMenh1() {
        
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
                <h2 className={styles.hidden} ref={(el) => hiddenElementsRef.current.push(el)}
                >Sứ mệnh của dự án</h2>

                <p className={styles.hidden} ref={(el) => hiddenElementsRef.current.push(el)}
                >Từ thực trạng bên trên chúng tôi đã cùng nhau tạo nên dự án này để nhằm nâng cao nhận thức về môi trường cũng nhưng thúc đẩy các hành động cụ thể giúp cải thiện môi trường sống của chúng ta.</p>
            </div>


            <div className={styles.div2}>
                <div className={styles.txt}>
                    <p className={styles.hidden} ref={(el) => hiddenElementsRef.current.push(el)}
                    >Chúng tôi giúp kết nối mọi người thực hiện những chiến dịch, những hành động cụ thể góp phần Bảo vệ môi trường</p>
                </div>

                <div className={styles.images}>
                    <div className={styles.imgbg}></div>
                    
                    <img alt=">_<" src={anh1} className={`${styles.img1} ${styles.hidden}`} ref={(el) => hiddenElementsRef.current.push(el)}></img>

                    <img alt=">_<" src={anh2} className={`${styles.img2} ${styles.hidden}`} ref={(el) => hiddenElementsRef.current.push(el)}></img>
                </div>

            </div>

        </div>
    );
}


export default CoSuMenh1
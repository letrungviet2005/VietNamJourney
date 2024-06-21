import styles from './SuMenh2.module.css';
import { Link } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';

import anh1 from '../../../Images/TrangChu/SuMenh2/anhphuhoa.png';
import anhbt from '../../../Images/TrangChu/SuMenh2/anhbt.png';
import anhs1 from '../../../Images/TrangChu/SuMenh2/la.png';
import anhs2 from '../../../Images/TrangChu/SuMenh2/research.png';
import anhs3 from '../../../Images/TrangChu/SuMenh2/tay.png';
import anhs4 from '../../../Images/TrangChu/SuMenh2/brain.png';





function CoSuMenh2() {

    
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
                <img alt="^_^" src={anh1}></img>
            </div>


            <div className={styles.div2}>
                <p className={`${styles.p1} ${styles.hidden}`} ref={(el) => hiddenElementsRef.current.push(el)}>Chúng tôi tạo ra quỹ hỗ trợ cho các hoạt động nghiên cứu bảo vệ môi trường</p>

                <div className={styles.signs}>
                    <div className={`${styles.sign} ${styles.hidden}`} ref={(el) => hiddenElementsRef.current.push(el)}>
                        <img alt=">_<" src={anhs1}></img>
                        <p>Dự án, hoạt động xanh</p>
                    </div>

                    <div className={`${styles.sign} ${styles.hidden}`} ref={(el) => hiddenElementsRef.current.push(el)}>
                        <img alt=">_<" src={anhs2}></img>
                        <p>Nghiên cứu công nghệ</p>
                    </div>

                    <div className={`${styles.sign} ${styles.hidden}`} ref={(el) => hiddenElementsRef.current.push(el)}>
                        <img alt=">_<" src={anhs3}></img>
                        <p>Giảm thiểu phát thải CO2</p>
                    </div>

                    <div className={`${styles.sign} ${styles.hidden}`} ref={(el) => hiddenElementsRef.current.push(el)}>
                        <img alt=">_<" src={anhs4}></img>
                        <p>Nâng cao nhận thức </p>
                    </div>

                </div>

                <div className={`${styles.bt1} ${styles.hidden}`} ref={(el) => hiddenElementsRef.current.push(el)}>
                    <Link to="/Quy">
                        <button>Ủng hộ quỹ</button>
                        <img alt="^_^" src={anhbt}></img>
                    </Link>
                </div>

            </div>

        </div>
    );
}


export default CoSuMenh2
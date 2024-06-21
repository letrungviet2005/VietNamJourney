import styles from './ThucTrang.module.css';
import React, { useEffect, useRef } from 'react';

import anh1 from '../../../Images/TrangChu/ThucTrang/anh1.png';


function CoThucTrang() {
    
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
                >Thực trạng môi trường hiện nay</h2>

                <p className={styles.hidden} ref={(el) => hiddenElementsRef.current.push(el)}
                >Hãy cùng nhau nhìn những con số mà chúng tôi đã tổng hợp về thực trạng
                ô nhiễm môi trường và tác động của nó đến Việt Nam hiện nay.</p>
            </div>


            <div className={styles.div2}>
                <div className={styles.div2_1}>
                    <img alt="^_^" src={anh1}></img>
                </div>


                <div className={styles.div2_2}>
                    <p>Để giảm thiểu CO2, Việt Nam cần đẩy mạnh phát triển năng lượng tái tạo, cải thiện hiệu quả năng lượng, tăng cường giao thông công cộng, bảo vệ rừng và áp dụng canh tác nông nghiệp bền vững. </p>
                </div>

            </div>

        </div>  
    );
}


export default CoThucTrang
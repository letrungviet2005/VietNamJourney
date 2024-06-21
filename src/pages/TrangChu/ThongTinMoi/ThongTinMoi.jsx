import styles from './ThongTinMoi.module.css';
import CopostCard from './postCard';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// import anhBt from '../../../Images/TrangChu/ThongTinMoi/anhBt.png';
import anh1 from '../../../Images/TrangChu/ThongTinMoi/anh1.png';
import anh2 from '../../../Images/TrangChu/ThongTinMoi/anh2.png';
import anh3 from '../../../Images/TrangChu/ThongTinMoi/anh3.png';




function CoThongTinMoi() {
    
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
            <div className={styles.divIn}>

                <div className={styles.txt}>
                    <h2 className={styles.hidden} ref={(el) => hiddenElementsRef.current.push(el)}
                    >Thông tin mới từ chúng tôi</h2>

                    <p className={styles.hidden} ref={(el) => hiddenElementsRef.current.push(el)}
                    >Cập nhật những thông tin mới nhất về dự án cũng như thông tin về môi trường ở Việt Nam và trên Thế giới</p>
                </div>

                {/* <div className={styles.bt}>
                    <button>Xem tất cả</button>
                    <img alt=">_<" src={anhBt}></img>
                </div> */}

                <div className={styles.posts}>
                    <Link className={styles.lnk} to="/TrangChu/New1">
                        <CopostCard image={anh1}
                                    txt1="Việt Nam"
                                    txt2="Việt Nam cam kết giảm rác thải rắn bằng 0 vào 2050"
                                    txt3="04/06/2024"
                        />
                    </Link>

                    <Link className={styles.lnk} to="/TrangChu/New2">
                        <CopostCard image={anh2}
                                    txt1="Thế giới"
                                    txt2="Năng lượng xanh - xu hướng toàn cầu năm 2024"
                                    txt3="04/06/2024"
                        />
                    </Link>

                    <Link className={styles.lnk} to="/TrangChu/New3">
                        <CopostCard image={anh3}
                                    txt1="Dự án"
                                    txt2="Giải chạy “Vì môi trường xanh” tại Thành phố Đà Nẵng"
                                    txt3="04/06/2024"
                        />
                    </Link>

                    
                </div>

            </div>

        </div>
    );
}


export default CoThongTinMoi


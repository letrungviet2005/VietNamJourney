import React, { useEffect, useRef } from "react";
import styles from "./GioiThieu.module.css";

import anh1 from "../../../Images/TrangChu/GioiThieu/anh1.png";
import anh2 from "../../../Images/TrangChu/GioiThieu/anh2.png";
import anh3 from "../../../Images/TrangChu/GioiThieu/anh3.png";
import video from "../../../videos/backgound_trangchu.mp4";

function CoGioiThieu() {
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

  return (
    <div className={styles.main}>
      <div className={styles.vid}>
        <div className={styles.dimmed}></div>
        <video autoPlay muted loop>
          <source
            src={video}
            type="video/mp4"
          ></source>
        </video>
      </div>

      <div className={styles.top}>
        <div
          className={`${styles.txt} ${styles.hidden}`}
          ref={(el) => hiddenElementsRef.current.push(el)}
        >
          <h2>
            <span className={styles.color1}>Thiên nhiên</span>
            <br></br>
            là tài sản vô giá
          </h2>

          <p>
            Với sứ mệnh nâng cao nhận thức về những thách thức môi trường mà đất
            nước đang phải đối mặt, từ những khu rừng nhiệt đới tươi tốt đến
            những rạn san hô rực rỡ. Hãy tham gia cùng chúng tôi thông qua các
            ​​cộng đồng, cơ hội tình nguyện và giáo dục, từ đó cùng nhau tạo nên
            một tương lai bền vững cho môi trường Việt Nam.
          </p>
        </div>
      </div>

      <div className={styles.bot}>
        <div className={styles.tabs}>
          <div
            className={`${styles.tab} ${styles.hidden}`}
            ref={(el) => hiddenElementsRef.current.push(el)}
          >
            <img alt=">_<" src={anh1}></img>

            <p className={styles.p1}>Về chúng tôi</p>
            <p className={styles.p2}>
              Những cá nhân<br></br>
              phát triển dự án này
            </p>

            {/* <p className={styles.p3}>Tìm hiểu thêm</p> */}
          </div>

          <div
            className={`${styles.tab} ${styles.hidden}`}
            ref={(el) => hiddenElementsRef.current.push(el)}
          >
            <img alt=">_<" src={anh2}></img>

            <p className={styles.p1}>Thực trạng</p>
            <p className={styles.p2}>
              Thực trạng môi trường<br></br>
              hiện nay tại Việt Nam
            </p>

            {/* <p className={styles.p3}>Tìm hiểu thêm</p> */}
          </div>

          <div
            className={`${styles.tab} ${styles.hidden}`}
            ref={(el) => hiddenElementsRef.current.push(el)}
          >
            <img alt=">_<" src={anh3}></img>

            <p className={styles.p1}>Sứ mệnh</p>
            <p className={styles.p2}>
              Những hoạt động chính<br></br>
              của dự án chúng tôi
            </p>

            {/* <p className={styles.p3}>Tìm hiểu thêm</p> */}
          </div>
        </div>

        <div className={styles.eclipse}></div>
      </div>
    </div>
  );
}

export default CoGioiThieu;

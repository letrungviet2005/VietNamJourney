import styles from "./Top.module.css";
import React, { useEffect, useRef } from "react";

// import huong from '../../../Images/Quy/Top/huong.png';

function CoTop() {
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
      <div
        className={`${styles.upper} ${styles.hidden}`}
        ref={(el) => hiddenElementsRef.current.push(el)}
      >
        <p>
          Tìm hiểu về cách ủng hộ cho chúng tôi<br></br>
          và cách chúng tôi sử dụng quỹ cho môi trường
        </p>
      </div>

      <div className={styles.bottom}>
        {/* <img alt=">_<" src={huong}></img> */}

        <div className={styles.imgpaper}></div>
      </div>
    </div>
  );
}

export default CoTop;

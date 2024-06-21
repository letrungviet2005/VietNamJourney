import styles from './VeChungToi.module.css';
import React, { useEffect, useRef } from 'react';

import CoCard from './Card';

import jpg1 from '../../../Images/Icons/Bao.jpeg';
import jpg2 from '../../../Images/Icons/Dinh.png';
import jpg3 from '../../../Images/Icons/Tu.jpeg';
import jpg4 from '../../../Images/Icons/Viet.jpeg';


function CoVeChungToi() {

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
            
            <div className={styles.txt1}>
                <h2 className={styles.hidden} ref={(el) => hiddenElementsRef.current.push(el)}>Về chúng tôi</h2>

                <p className={styles.hidden} ref={(el) => hiddenElementsRef.current.push(el)}>Với mục tiêu chung làm việc vì môi trường, chúng tôi cùng nhau xây dựng dự án này
                nhằm mong muốn nâng cao nhận thức về môi trường đến cho tất cả mọi người.</p>
            </div>


            <div className={styles.cards}>
                <CoCard image={jpg1}
                        txt1="Cao Hoàng Phước Bảo"
                        txt2="Đồng sáng lập dự án"
                        txt3="“Phần còn lại của thế giới (thiên nhiên) có thể tiếp tục sống mà không có chúng ta, nhưng chúng ta không thể tồn tại nếu thiếu đi chúng”."
                />

                <CoCard image={jpg2}
                        txt1="Dương Đính"
                        txt2="Đồng sáng lập dự án"
                        txt3="“Tôi cảm thấy tức giận khi nhìn thấy người ta vứt bỏ đi những thứ có thể sử dụng được. Điều này thật lãng phí”. "
                />

                <CoCard image={jpg3}
                        txt1="Lê Hữu Anh Tú"
                        txt2="Đồng sáng lập dự án"
                        txt3="“Môi trường là nơi chúng ta gặp nhau, là nơi đem lại lợi ích cho mọi người, là điều mà tất cả chúng ta đều chia sẻ”."
                />

                <CoCard image={jpg4}
                        txt1="Lê Trung Việt"
                        txt2="Đồng sáng lập dự án"
                        txt3="“Có một sự thật không thể chối bỏ rằng một nhóm nhỏ công dân có ý thức và tận tâm có thể thay đổi cả thế giới”."
                />                

            </div>

        </div>
    );
}


export default CoVeChungToi

import styles from './Donate.module.css';

import support1 from '../../../Images/Quy/Donate/support1.png';
import support2 from '../../../Images/Quy/Donate/support2.png';
import support3 from '../../../Images/Quy/Donate/support3.png';



function CoDonate() {
    return(
        <div className={styles.main}>

            <div className={styles.top}>
                <h2>Bắt đầu hành trình của bạn với chúng tôi</h2>

                <p>Quỹ VIETNAM JOURNEY cam kết sử dụng toàn bộ số tiền vào các dự án có mục tiêu môi trường.<br></br>
                Đồng thời cam kết theo dõi và báo cáo thường xuyên về hiệu quả môi trường của các dự án mà chúng tôi hỗ trợ.</p>
            </div>


            <div className={styles.bot}>
                <div className={styles.div_left}>
                    <p>Hình thức chuyển khoản</p>

                    <img alt="^_^" src={support1}></img>
                </div>


                <div className={styles.div_right}>
                    <p className={styles.p1}>Hình thức khác</p>

                    <div className={styles.part1}>
                        <img alt=">_<" src={support2} className={styles.img2}></img>

                        <img alt=">_<" src={support3} className={styles.img3}></img>
                    </div>

                    <p className={styles.p2}><span className={styles.span1}>Văn phòng đại diện dự án VIETNAM JOURNEY</span><br></br>
                    Địa chỉ: 144 Trần Đại Nghĩa, Đà Nẵng<br></br>
                    Hotline: 19001234</p>
                </div>

            </div>

        </div>
    );
}


export default CoDonate
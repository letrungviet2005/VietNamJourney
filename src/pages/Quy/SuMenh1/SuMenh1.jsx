import styles from './SuMenh1.module.css';

import CoBar from './Bar';

import ngudan2 from '../../../Images/Quy/SuMenh1/ngudan2.png';



function CoSuMenh1() {
    return(
        <div className={styles.main}>

            <div className={styles.div_left}>
                <div className={styles.top}>
                    <h2>Chúng tôi sẽ sử dụng quỹ như thế nào?</h2>

                    <p>Quỹ VIETNAM JOURNEY hoạt động nhằm tăng cường khả năng tiếp cận cho các dự án, nghĩa là nhanh hơn, đơn giản hơn, với các tiêu chuẩn hài hòa, được cung cấp gần hơn với cộng đồng địa phương và xúc tác cho nhiều nguồn tài trợ hơn.</p>
                </div>


                <div className={styles.bot}>
                    <p className={styles.p1}>Chúng tôi sẽ tài trợ cho</p>

                    <CoBar txt="Các dự án bảo vệ môi trường" />
                    <CoBar txt="Các dự án tình nguyện" />
                    <CoBar txt="Các dự án trồng cây xanh" />
                    <CoBar txt="Các hoạt động cộng đồng vì môi trường" />

                </div>

            </div>


            <div className={styles.div_right}>
                <img alt=">_<" src={ngudan2}></img>

                <p>Ngư dân tỉnh Quảng Trị chứng kiến ​​kích thước cá đánh bắt được ngày càng giảm dần.
                Ảnh: Nguyễn Duy Hải - Tổ chức Việt Nam Xanh</p>
            </div>











        </div>
    );
}


export default CoSuMenh1
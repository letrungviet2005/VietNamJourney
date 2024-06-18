import styles from './SoLuoc.module.css';

import anh1 from '../../../Images/Quy/SoLuoc/anh1.png';
import anh2 from '../../../Images/Quy/SoLuoc/anh2.png';
import anh3 from '../../../Images/Quy/SoLuoc/anh3.png';



function CoSoLuoc() {
    return(
        <div className={styles.main}>

            <div className={styles.div_left}>
                <div className={styles.nenbg}></div>

                <img alt=">_<" src={anh1} className={styles.anh1}></img>

                <div className={styles.imgbot}>
                    <img alt=">_<" src={anh2} className={styles.anh2}></img>

                    <img alt=">_<" src={anh3} className={styles.anh3}></img>
                </div>

            </div>


            <div className={styles.div_right}>
                <h2 className={styles.h2}>Một quỹ được sử dụng cho các hoạt động bảo vệ môi trường.</h2>

                <p className={styles.p1}>Quỹ môi trường thuộc dự án VIETNAM JOURNEY đẩy nhanh các hành động bảo vệ môi trường góp phần giảm thiểu biến đổi khí hậu ở Việt Nam thông qua cách tiếp cận và sử dụng các giải pháp tài chính linh hoạt cũng như kiến ​​thức chuyên môn về đầu tư môi trường.</p>

                <div className={styles.stats1}>
                    <hr></hr>

                    <p>Sơ lược về quỹ của chúng tôi </p>

                    <hr></hr>
                </div>


                <div className={styles.stats2}>
                    <div className={styles.mini}>
                        <h2>253</h2>
                        <p>Số dự án được hỗ trợ</p>
                    </div>

                    <div className={styles.mini}>
                        <h2>13.9</h2>
                        <p>Tổng số tiền (tỉ đồng)</p>
                    </div>

                    <div className={styles.mini}>
                        <h2>43</h2>
                        <p>Tỉnh / thành phố</p>
                    </div>
                </div>

            </div>

        </div>
    );
}


export default CoSoLuoc
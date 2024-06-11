import styles from './SuMenh1.module.css';

import anh1 from '../../../Images/TrangChu/SuMenh1/anh1.png';
import anh2 from '../../../Images/TrangChu/SuMenh1/anh2.png';


function CoSuMenh1() {
    return(
        <div className={styles.main}>
        
            <div className={styles.div1}>
                <h2>Sứ mệnh của dự án</h2>

                <p>Từ thực trạng bên trên chúng tôi đã cùng nhau tạo nên dự án này để nhằm nâng cao nhận thức về môi trường cũng nhưng thúc đẩy các hành động cụ thể giúp cải thiện môi trường sống của chúng ta.</p>
            </div>


            <div className={styles.div2}>
                <div className={styles.txt}>
                    <p>Chúng tôi giúp kết nối mọi người thực hiện những chiến dịch, những hành động cụ thể góp phần Bảo vệ môi trường</p>
                </div>

                <div className={styles.images}>
                    <div className={styles.imgbg}></div>
                    
                    <img alt=">_<" src={anh1} className={styles.img1}></img>

                    <img alt=">_<" src={anh2} className={styles.img2}></img>
                </div>

            </div>

        </div>
    );
}


export default CoSuMenh1
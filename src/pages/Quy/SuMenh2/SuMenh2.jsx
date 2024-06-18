import styles from './SuMenh2.module.css';

import anh1 from '../../../Images/Quy/SuMenh2/anhphuhoa.png';
import anhs1 from '../../../Images/Quy/SuMenh2/la.png';
import anhs2 from '../../../Images/Quy/SuMenh2/research.png';
import anhs3 from '../../../Images/Quy/SuMenh2/tay.png';
import anhs4 from '../../../Images/Quy/SuMenh2/brain.png';



function CoSuMenh2() {
    return(
        <div className={styles.main}>

            <div className={styles.div1}>
                <img alt="^_^" src={anh1}></img>
            </div>


            <div className={styles.div2}>
                <p className={styles.p1}>Ngoài ra chúng tôi hỗ trợ các hoạt động nghiên cứu giúp bảo vệ môi trường và ngăn chặn biến đổi khí hậu.</p>

                <div className={styles.signs}>
                    <div className={styles.sign}>
                        <img alt=">_<" src={anhs1}></img>
                        <p>Tạo ra năng lượng xanh</p>
                    </div>

                    <div className={styles.sign}>
                        <img alt=">_<" src={anhs2}></img>
                        <p>Nghiên cứu công nghệ</p>
                    </div>

                    <div className={styles.sign}>
                        <img alt=">_<" src={anhs3}></img>
                        <p>Giảm thiểu phát thải CO2</p>
                    </div>

                    <div className={styles.sign}>
                        <img alt=">_<" src={anhs4}></img>
                        <p>Nâng cao nhận thức </p>
                    </div>

                </div>

            </div>

        </div>
    );
}


export default CoSuMenh2
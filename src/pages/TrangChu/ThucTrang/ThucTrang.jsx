import styles from './ThucTrang.module.css';

import anh1 from '../../../Images/TrangChu/ThucTrang/anh1.png';


function CoThucTrang() {
    return(
        <div className={styles.main}>

            <div className={styles.div1}>
                <h2>Thực trạng môi trường hiện nay</h2>

                <p>Hãy cùng nhau nhìn những con số mà chúng tôi đã tổng hợp về thực trạng
                ô nhiễm môi trường và tác động của nó đến Việt Nam hiện nay.</p>
            </div>


            <div className={styles.div2}>
                <div className={styles.div2_1}>
                    <img alt="^_^" src={anh1}></img>
                </div>


                <div className={styles.div2_2}>
                    <p>Trong giai đoạn 1994 - 2016, tổng lượng phát thải khí
                    nhà kính (KNK) của Việt Nam đã tăng khoảng 3 lần,
                    từ 103,8 triệu tấn lên 316,7 triệu tấn CO2 tương đương. </p>
                </div>

            </div>

        </div>  
    );
}


export default CoThucTrang
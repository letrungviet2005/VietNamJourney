import styles from './Top.module.css';

import huong from '../../../Images/Quy/Top/huong.png';



function CoTop() {
    return(
        <div className={styles.main}>

            <div className={styles.upper}>
                <p>Tìm hiểu về cách ủng hộ cho chúng tôi<br></br>
                và cách chúng tôi sử dụng quỹ cho môi trường</p>
            </div>


            <div className={styles.bottom}>
                <img alt=">_<" src={huong}></img>

                <div className={styles.imgpaper}></div>
            </div>

        </div>
    );
}


export default CoTop
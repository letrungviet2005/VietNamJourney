import styles from './ThongTinMoi.module.css';
import CopostCard from './postCard';

import anhBt from '../../../Images/TrangChu/ThongTinMoi/anhBt.png';
import anh1 from '../../../Images/TrangChu/ThongTinMoi/anh1.png';
import anh2 from '../../../Images/TrangChu/ThongTinMoi/anh2.png';
import anh3 from '../../../Images/TrangChu/ThongTinMoi/anh3.png';




function CoThongTinMoi() {
    return(
        <div className={styles.main}>            
            <div className={styles.divIn}>

                <div className={styles.txt}>
                    <h2>Thông tin mới từ chúng tôi</h2>
                    <p>Cập nhật những thông tin mới nhất về dự án cũng như thông tin về môi trường ở Việt Nam và trên Thế giới</p>
                </div>

                {/* <div className={styles.bt}>
                    <button>Xem tất cả</button>
                    <img alt=">_<" src={anhBt}></img>
                </div> */}

                <div className={styles.posts}>
                    <CopostCard image={anh1}
                                txt1="Việt Nam"
                                txt2="Việt Nam cam kết giảm rác thải rắn bằng 0 vào 2050"
                                txt3="04/06/2024"
                    />

                    <CopostCard image={anh2}
                                txt1="Thế giới"
                                txt2="Năng lượng xanh - xu hướng toàn cầu năm 2024"
                                txt3="04/06/2024"
                    />

                    <CopostCard image={anh3}
                                txt1="Dự án"
                                txt2="Giải chạy “Vì môi trường xanh” tại Thành phố Đà Nẵng"
                                txt3="04/06/2024"
                    />
                    
                </div>

            </div>

        </div>
    );
}


export default CoThongTinMoi


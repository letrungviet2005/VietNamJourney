import styles from './Intro.module.css';
import { Link } from 'react-router-dom';

import vid1 from "../../videos/videointro.mp4";

function Intro() {

    return (
        <div className={styles.main}>
            <div className={styles.vid}>
                <video id='myvideo' controls>
                    <source src={vid1} type="video/mp4" />
                    Your browser doesn't support the video tag.
                </video>

            </div>

            {/* <div className={styles.front}>
                <Link className={styles.lnk} to="/TrangChu">
                    <p className={styles.next}>Tiếp Tục</p>
                </Link>

            </div> */}

        </div>
    );
}

export default Intro;

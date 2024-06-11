import PropTypes from 'prop-types';

import styles from './postCard.module.css';

import anhStatus from '../../../Images/TrangChu/ThongTinMoi/anhStatus.png';
import anhClock from '../../../Images/TrangChu/ThongTinMoi/anhClock.png';


function CopostCard(props) {
    return(
        <div className={styles.main}>

            <div className={styles.post_div1}>
                <img alt=">_<" src={props.image}></img>
            </div>


            <div className={styles.post_div2}>
                <div className={styles.info1}>
                    <img alt=":3" src={anhStatus}></img>

                    <p>{props.txt1}</p>
                </div>


                <div className={styles.info2}>
                    <p>{props.txt2}</p>
                </div>


                <div className={styles.info3}>
                    <img alt=":3" src={anhClock}></img>

                    <p>{props.txt3}</p>
                </div>

            </div>

        </div>
    );
}


CopostCard.propTypes = {
    image: PropTypes.string,
    txt1: PropTypes.string,
    txt2: PropTypes.string,
    txt3: PropTypes.string,
}


export default CopostCard
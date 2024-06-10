import styles from './Card.module.css';
import PropTypes from 'prop-types';

// import jpg1 from '../../../Images/Icons/Bao.jpeg';



function CoCard(props) {
    return(
        <div className={styles.main}>

            <div className={styles.block1}>

                <div className={styles.img}>
                    <img alt=">_<" src={props.image}></img>
                </div>

                <div className={styles.txtBlock}>
                    <p className={styles.txt1}>{props.txt1}</p>
                    <p className={styles.txt2}>{props.txt2}</p>
                </div>

            </div>


            <div className={styles.block2}>
                <p>{props.txt3}</p>
            </div>

        </div>
    );
}


CoCard.propTypes = {
    image: PropTypes.string,
    txt1: PropTypes.string,
    txt2: PropTypes.string,
    txt3: PropTypes.string,
}


export default CoCard

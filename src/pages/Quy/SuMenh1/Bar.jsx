import styles from './Bar.module.css';
import PropTypes from 'prop-types';

import muiten from "../../../Images/Quy/SuMenh1/muiten.png";


function CoBar(props) {
    return(
        <div className={styles.main}>

            <img alt=">_<" src={muiten}></img>

            <p>{props.txt}</p>
        </div>
    );
}


CoBar.propTypes = {
    txt: PropTypes.string,
}


export default CoBar
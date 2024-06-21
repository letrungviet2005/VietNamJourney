import styles from './Bar.module.css';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

import muiten from "../../../Images/Quy/SuMenh1/muiten.png";


function CoBar(props) {

    // Scrolling animation
    const hiddenElementsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.show);
                }
                //  else {
                //     entry.target.classList.remove(styles.show);
                // }
            });
        });

        hiddenElementsRef.current.forEach((el) => observer.observe(el));

        // Cleanup function to unobserve elements
        // return () => {
        //     hiddenElementsRef.current.forEach((el) => observer.unobserve(el));
        // };
    }, []);



    return(
        <div className={`${styles.main} ${styles.hidden}`} ref={(el) => hiddenElementsRef.current.push(el)}>

            <img alt=">_<" src={muiten}></img>

            <p>{props.txt}</p>
        </div>
    );
}


CoBar.propTypes = {
    txt: PropTypes.string,
}


export default CoBar
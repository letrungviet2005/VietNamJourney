import styles from './Card.module.css';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

// import jpg1 from '../../../Images/Icons/Bao.jpeg';



function CoCard(props) {

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

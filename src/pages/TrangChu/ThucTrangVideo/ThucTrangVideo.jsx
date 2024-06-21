import styles from './ThucTrangVideo.module.css';



function CoThucTrangVideo() {
    return(
        <div className={styles.main}>
            <iframe className={styles.vid} 
            src="https://www.youtube.com/embed/JOetIicQhHs?si=w6nIxFj5nM2coV7A"
            title="A youtube video"
            ></iframe>
        </div>
    );
}


export default CoThucTrangVideo
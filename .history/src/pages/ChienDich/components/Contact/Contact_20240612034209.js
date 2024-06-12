import classNames from "classnames/bind";
import style from './Contact.module.scss';

const cx = classNames.bind(style);

function Contact() {
  return (  
    <div className={cx('contact')}>
      <h2 className={cx('title')}>Cơ quan phối hợp hỗ trợ</h2>
      <div className={cx('row')}>
        <div className={cx('col-4')}>
          <img 
        </div>
      </div>
    </div>
  );
}

export default Contact;
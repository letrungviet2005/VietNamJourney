import classNames from "classnames/bind";
import style from './Contact.module.scss';

const cx = classNames.bind(style);

function Contact() {
  return (  
    <div className={cx('contact')}>
      <h2>Cow quan phối hợp hỗ trợ</h2>
    </div>
  );
}

export default Contact;
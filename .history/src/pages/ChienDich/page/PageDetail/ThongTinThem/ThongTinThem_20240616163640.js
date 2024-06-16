import classNames from "classnames/bind";
import style from './ThongTinThem.module.scss';

const cx = classNames.bind(style);

function ThongTinThem() {
  return (  
    <div className={cx('ThongTinThem')}>
      <div className={cx('contact')}>
        <hr />
        <div className={cx('title')}>Liên hệ </div>
        <div className={cx('info')}>
          <div className={cx('item')}>
            <p className={cx('desc')}>Thông tin về việc tham gia chiến dịch</p>
            <p className={cx('title')}>Ban Nhân sự dự án</p>
            <p className={cx('email')}><i class="fa-solid fa-envelope"></i> hr.fp095@contact.com</p>
          </div>
          <div className={cx('item')}>
            <p className={cx('desc')}>Tìm hiểu thêm thông tin về chiến dịch</p>
            <p className={cx('title')}>Đại diện dự án VIETNAM JOURNEY</p>
            <p className={cx('email')}><i class="fa-solid fa-envelope"></i> infor.fp095@contact.com</p>
          </div>
          <div className={cx('item')}>
            <p className={cx('desc')}>Tìm hiểu thêm thông tin về quỹ dự án</p>
            <p className={cx('title')}>Đại diện quỹ VIETNAM JOURNEY</p>
            <p className={cx('email')}><i class="fa-solid fa-envelope"></i> fund.fp095@contact.com</p>
          </div>
          <div className={cx('item')}>
            <p className={cx('desc')}>Bất kì khiếu nại hoặc phàn nàn</p>
            <p className={cx('title')}>Mrs. Đỗ Anh Thư</p>
            <p className={cx('email')}><i class="fa-solid fa-envelope"></i> thuda.fp095@contact.com</p>
          </div>
        </div>
      </div>
      <div className={cx('organizations')}>
        <hr />
        <div className={cx('title')}>Các tổ chức hỗ trợ thực hiện</div>
        <div className={cx('logo')}>
          <img src=""/>
        </div>
      </div>
    </div>
  );
}

export default ThongTinThem;
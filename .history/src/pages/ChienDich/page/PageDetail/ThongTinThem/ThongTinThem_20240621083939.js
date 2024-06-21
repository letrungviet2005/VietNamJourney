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
            <p className={cx('title')}>Ban Nhân sự dự án</p>
            <p className={cx('email')}><i class="fa-solid fa-envelope"></i> hr.fp095@contact.com</p>
          </div>
          <div className={cx('item')}>
            <p className={cx('title')}>Đại diện dự án VIETNAM JOURNEY</p>
            <p className={cx('email')}><i class="fa-solid fa-envelope"></i> infor.fp095@contact.com</p>
          </div>
          <div className={cx('item')}>
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
          <img src="https://quatanghungthinh.vn/wp-content/uploads/2021/03/Huy-hieu-doan-PNG-918x1024.png"/>
          <p className={cx('title')}>Đoàn TNCS Hồ Chí Minh huyện Triệu Phong</p>
        </div>
        <div className={cx('item')}>
            <p className={cx('desc')}>Phó bí thư Ban chấp hành</p>
            <p className={cx('title')}>Anh Nguyễn Hoàng Vũ</p>
            <p className={cx('email')}><i class="fa-solid fa-envelope"></i> vu.nguyenhoang@contact.com</p>
        </div>
        <div className={cx('item')}>
            <p className={cx('desc')}>Giám đốc khu vực Châu Á - Thái Bình Dương</p>
            <p className={cx('title')}>Mrs. Nancy Bennet</p>
            <p className={cx('email')}><i class="fa-solid fa-envelope"></i> nancy.bennet@undp.com</p>
        </div>
      </div>
    </div>
  );
}

export default ThongTinThem;
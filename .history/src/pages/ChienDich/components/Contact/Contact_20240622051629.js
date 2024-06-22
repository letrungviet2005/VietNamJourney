import classNames from "classnames/bind";
import style from './Contact.module.scss';

const cx = classNames.bind(style);

function Contact() {
  return (  
    <div className={cx('Contact')}>
      <h2 className={cx('title')}>Cơ quan phối hợp hỗ trợ</h2>
      <div className={cx('row')}>
        <div className={cx('col-4', 'coquan')}>
          <img src="https://rubee.com.vn/wp-content/uploads/2021/05/logo-doan-4.png"/>
          <p>Đoàn TNCS Hồ Chí Minh Quảng Trị</p>
        </div>
        <div className={cx('col-4', 'coquan')}>
          <img src="https://tnmttravinh.gov.vn/img/logo.png"/>
          <p>Sở Tài Nguyên và Môi Trường Quảng Trị</p>
        </div>
        <div className={cx('col-4', 'coquan')}>
          <img src="http://huib.hueuni.edu.vn/wp-content/uploads/2020/12/logo.-khong-chu.-khong-layer.-600.png"/>
          <p>Viện Công Nghệ sinh học, ĐH Huế</p>
        </div>
      </div>
      <h2 className={cx('title')}>Liên hệ với chúng tôi</h2>
      <div className={cx('chuyengia-row')}>
        <div className={cx('chuyengia')}>
          <img src="http://2.bp.blogspot.com/-X1CUJxJh5IM/UkTIYVjPVNI/AAAAAAAAEvM/jpGATZ-KZPo/s1600/0324f_Taylor+Swift+2013_60p.jpg"/>
          <div className={cx('name')}>Mrs. Amgad Elmahdi</div>
          <div className={cx('desc')}>Chuyên gia dự án VIETNAM JOURNEY tại tỉnh Quảng Trị</div>
          <div className={cx('email')}><i class="fa-solid fa-envelope"></i> elmahdi@contact.com</div>
        </div>
        <div className={cx('chuyengia')}>
          <img src="https://duanmasterisehomes.vn/wp-content/uploads/2022/11/do-tu-anh-chu-tich-masterise-homes.jpg"/>
          <div className={cx('name')}>Chị Đỗ Anh Thư</div>
          <div className={cx('desc')}>Đại diện dự án VIETNAM JOURNEY tại tỉnh Quảng Trị</div>
          <div className={cx('email')}><i class="fa-solid fa-envelope"></i> anhthu.do@contact.com</div>
        </div>
        <div className={cx('chuyengia')}>
          <img src="https://media.yeah1.com/files/ngoctran/2022/07/01/289693821_582015943280803_2102006602626651935_n-205941.jpg"/>
          <div className={cx('name')}>Anh Nguyễn Dương</div>
          <div className={cx('desc')}>Chuyên gia phân tích quỹ VIETNAM JOURNEY tại khu vực</div>
          <div className={cx('email')}><i class="fa-solid fa-envelope"></i> nh.duong@contact.com</div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
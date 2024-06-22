import classNames from "classnames/bind";
import style from './TacDong.module.scss';

const cx = classNames.bind(style);

function TacDong({ campaign }) {
  const totalMoney = campaign.totalMoney.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  const moneyByVNJN = campaign.moneyByVNJN.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  return (  
    <div className={cx('TacDong')}>
      <div className={cx('row')}>
        <div className={cx('col-xl-6', 'col-lg-6', 'col-md-6', 'col-sm-6','col-12')}>
          <div className={cx('title', 'left')}>
            Tổng giá trị dự án
          </div>
          <div className={cx('number')}>
            {totalMoney}
          </div>
        </div>
        <div className={cx('col-xl-6', 'col-lg-6', 'col-md-6', 'col-sm-6','col-12')}>
          <div className={cx('title')}>
            Quỹ VIETNAM JOURNEY tài trợ
          </div>
          <div className={cx('number')}>
            {moneyByVNJN}
          </div>
        </div>
      </div>
      <div className={cx('row')}>
        <div className={cx('col-xl-6', 'col-lg-6', 'col-md-6', 'col-sm-6','col-12')}>
          <div className={cx('title', 'left')}>
            Mục tiêu dự án
          </div>
          <div className={cx('desc')}>
            Môi trường
          </div>
        </div>
        <div className={cx('col-xl-6', 'col-lg-6', 'col-md-6', 'col-sm-6','col-12')}>
          <div className={cx('title')}>
            Có tác động đến các lĩnh vực
          </div>
          <div className={cx('icon')}>
            <ul>
              <li><i class="fa-solid fa-city"></i></li>
              <li className={cx('mo')}><i class="fa-solid fa-seedling"></i></li>
              <li><i class="fa-solid fa-charging-station"></i></li>
              <li className={cx('mo')}><i class="fa-solid fa-droplet"></i></li>
              <li><i class="fa-solid fa-heart-pulse"></i></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TacDong;
import classNames from "classnames/bind";
import style from './CampaignIng.module.scss';
import Campaign from "../Campaign/Campaign";

const cx = classNames.bind(style);

function CampaignIng() {
  return (  
    <div className={cx('CampaignIng')}>
      <h2>Chiến dịch đang diễn ra</h2>
      <div className={cx('row', 'pad')}>
        <Campaign className={cx('col-4')} 
          campId={'FP056'}
          campType={'TÌNH NGUYỆN'}
          title={'HUYỆN VĨNH LINH'}
          desc={'Phát động trồng 5000 cây xanh trong mùa hè 2024'}
          imageUrl={'https://photo-cms-tpo.zadn.vn/Uploaded/2021/dr-ysleozyr/2021_04_23/image002-7267.jpeg'}
        />
        <Campaign className={cx('col-4')} 
          campId={'FP194'}
          campType={'TÌNH NGUYỆN'}
          title={'HUYỆN TRIỆU PHONG'}
          desc={'Xây dựng thói quen bảo vệ môi trường cho học sinh'}
          imageUrl={'https://ktmt.vnmediacdn.com/images/2021/05/16/33-1621106304-oan-thanh-nien-trong-cay-tao-moi-truong-song-xanh-sach-dep-cho-nguoi-dan.jpg'}
        />
        <Campaign className={cx('col-4')} 
          campId={'FP023'}
          campType={''}
          title={''}
          desc={''}
          imageUrl={''}
        />
      </div>
    </div>
  );
}

export default CampaignIng;
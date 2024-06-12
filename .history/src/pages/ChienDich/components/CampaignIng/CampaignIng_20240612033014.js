import classNames from "classnames/bind";
import style from './CampaignIng.module.scss';
import Campaign from "../Campaign/Campaign";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const cx = classNames.bind(style);

function CampaignIng() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  return (  
    <div className={cx('CampaignIng')}>
      <hr/>
      <h2 className={cx('title')}>Chiến dịch đang diễn ra</h2>
      <Slider {...settings} className={cx('row', 'pad')}>
        <Campaign className={cx('col-4', 'slick-slide')} 
          campId={'FP056'}
          campType={'TÌNH NGUYỆN'}
          title={'HUYỆN VĨNH LINH'}
          desc={'Phát động trồng 5000 cây xanh trong mùa hè 2024'}
          imageUrl={'https://photo-cms-tpo.zadn.vn/Uploaded/2021/dr-ysleozyr/2021_04_23/image002-7267.jpeg'}
        />
        <Campaign className={cx('col-4', 'slick-slide')} 
          campId={'FP194'}
          campType={'TÌNH NGUYỆN'}
          title={'HUYỆN TRIỆU PHONG'}
          desc={'Xây dựng thói quen bảo vệ môi trường cho học sinh'}
          imageUrl={'https://ktmt.vnmediacdn.com/images/2021/05/16/33-1621106304-oan-thanh-nien-trong-cay-tao-moi-truong-song-xanh-sach-dep-cho-nguoi-dan.jpg'}
        />
        <Campaign className={cx('col-4')} 
          campId={'FP023'}
          campType={'NGHIÊN CỨU'}
          title={'HUYỆN QUẢNG ĐIỆN'}
          desc={'Nghiên cứu giống cây tràm chịu mặn tại các rừng phòng hộ của địa phương'}
          imageUrl={'https://media.loveitopcdn.com/3807/y-nghia-cua-mau-ao-xanh-tinh-nguyen-1.jpg'}
        />
        <Campaign className={cx('col-4')} 
          campId={'FP194'}
          campType={'TÌNH NGUYỆN'}
          title={'HUYỆN TRIỆU PHONG'}
          desc={'Xây dựng thói quen bảo vệ môi trường cho học sinh'}
          imageUrl={'https://ktmt.vnmediacdn.com/images/2021/05/16/33-1621106304-oan-thanh-nien-trong-cay-tao-moi-truong-song-xanh-sach-dep-cho-nguoi-dan.jpg'}
        />
      </Slider>
    </div>
  );
}

export default CampaignIng;
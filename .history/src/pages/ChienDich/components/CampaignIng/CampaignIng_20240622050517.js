import React, { useState, useEffect } from 'react';
import classNames from "classnames/bind";
import style from './CampaignIng.module.scss';
import Campaign from "../Campaign/Campaign";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from 'axios';

const cx = classNames.bind(style);

function CampaignIng({ province }) {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    // Hàm để gửi yêu cầu API và cập nhật danh sách chiến dịch
    async function fetchCampaigns() {
      try {
        const response = await axios.get(`http://localhost/bwd/VietNamJourney/Server/ChienDich/Detail_Ing.php?province=${province}`);
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    }

    fetchCampaigns(); // Gọi lần đầu khi component mount

  }, [province]); // Thực hiện lại khi province thay đổi

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Số lượng slides mặc định hiển thị
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 767.8, // Kích thước màn hình tối đa để áp dụng cài đặt này
        settings: {
          slidesToShow: 2, // Hiển thị 2 slides khi max-width <= 767.8px
          slidesToScroll: 1,
        },
      },
      // Bạn có thể thêm các điểm ngắt khác nếu cần
    ],
  };
  return (  
    <div className={cx('CampaignIng')}>
      <hr/>
      <h2 className={cx('title')}>Chiến dịch đang diễn ra</h2>
      <Slider {...settings} className={cx('row', 'pad')}>
        {campaigns.map(campaign => (
          <Campaign
            key={campaign.id}
            campId={campaign.id}
            desc={campaign.name}
            title={campaign.district}
            imageUrl={campaign.image}
          />
        ))}
      </Slider>
    </div>
  );
}

export default CampaignIng;

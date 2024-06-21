import classNames from "classnames/bind";
import style from './CampaignWill.module.scss';
import Campaign from "../Campaign/Campaign";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { useState, useEffect } from 'react';
import axios from 'axios';

const cx = classNames.bind(style);

function CampaignWill() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    // Hàm để gửi yêu cầu API và cập nhật danh sách chiến dịch
    async function fetchCampaigns() {
      try {
        const response = await axios.get(`http://localhost/bwd/VietNamJourney/Server/ChienDich/Detail_Will.php?province=${province}`);
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
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (  
    <div className={cx('CampaignWill')}>
      <hr/>
      <h2 className={cx('title')}>Chiến dịch sắp tới</h2>
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

export default CampaignWill;
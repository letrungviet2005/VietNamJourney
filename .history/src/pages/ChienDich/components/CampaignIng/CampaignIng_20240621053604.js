import React, { useState, useEffect } from 'react';
import classNames from "classnames/bind";
import style from './CampaignIng.module.scss';
import Campaign from "../Campaign/Campaign";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from 'axios';

const cx = classNames.bind(style);

function CampaignIng() {
  const [campaigns, setCampaigns] = useState([]);
  const [province, setProvince] = useState('');

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
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (  
    <div className={cx('CampaignIng')}>
      <hr/>
      <h2 className={cx('title')}>Chiến dịch đang diễn ra</h2>
      <select value={province} onChange={e => setProvince(e.target.value)}>
        <option value="">Chọn tỉnh/thành phố</option>
        <option value="Quang Tri">Quảng Trị</option>
        <option value="Thua Thien Hue">Thừa Thiên Huế</option>
        <option value="Da Nang">Đà Nẵng</option>
      </select>
      <Slider {...settings} className={cx('row', 'pad')}>
        {campaigns.map(campaign => (
          <Campaign
            key={campaign.id}
            id={campaign.id}
            name={campaign.name}
            province={campaign.province}
            district={campaign.district}
            location={campaign.location}
            dateStart={campaign.dateStart}
            dateEnd={campaign.dateEnd}
            totalMoney={campaign.totalMoney}
            moneyByVNJN={campaign.moneyByVNJN}
            timeline={campaign.timeline}
            infoContact={campaign.infoContact}
            infoOrganization={campaign.infoOrganization}
            image={campaign.image}
            description={campaign.description}
            status={campaign.status}
          />
        ))}
      </Slider>
    </div>
  );
}

export default CampaignIng;

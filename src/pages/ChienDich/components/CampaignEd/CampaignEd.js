import React, { useState, useEffect } from 'react';
import classNames from "classnames/bind";
import style from './CampaignEd.module.scss';
import Campaign from "../Campaign/Campaign";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from 'axios';
import { Skeleton } from 'antd'; // Import Skeleton từ antd

const cx = classNames.bind(style);

function CampaignEd({ province }) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading

  useEffect(() => {
    // Hàm để gửi yêu cầu API và cập nhật danh sách chiến dịch
    async function fetchCampaigns() {
      setLoading(true); // Đặt loading là true trước khi gửi yêu cầu API
      try {
        const response = await axios.get(`http://localhost:8000/api/listCampaignEd/${province}`);
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false); // Đặt loading là false sau khi dữ liệu đã được tải xong
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
      {
        breakpoint: 575.8, // Kích thước màn hình tối đa để áp dụng cài đặt này
        settings: {
          slidesToShow: 1, // Hiển thị 1 slide khi max-width <= 575.8px
          slidesToScroll: 1,
        },
      }
    ],
  };

  return (  
    <div className={cx('CampaignEd')}>
      <hr/>
      <h2 className={cx('title')}>Chiến dịch đã kết thúc</h2>
      
      {loading ? (
        // Hiển thị Skeleton khi dữ liệu đang được tải
        <>
          <div className={cx('skeleton-slide')}>
            <Skeleton active />
          </div>
        </>
      ) : (
        // Hiển thị các campaign sau khi dữ liệu đã được tải
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
      )}
    </div>
  );
}

export default CampaignEd;

import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import style from './info.module.scss';
import axios from 'axios';

const cx = classNames.bind(style);

function Info({ className, province }) {
  const provinces = [
    {
      province: "Đà Nẵng",
      urlImage: "https://www.pullman-danang.com/wp-content/uploads/sites/86/2019/05/DJI_0004.jpg"
    },
    {
      province: "Thừa Thiên Huế",
      urlImage: "https://en.phuot3mien.com/wp-content/uploads/2023/01/hue-festivals-3.jpg"
    },
    {
      province: "Quảng Trị",
      urlImage: "https://toplist.vn/images/800px/cau-hien-luong-song-ben-hai-507421.jpg"
    }
    // Thêm các tỉnh khác nếu cần
  ];

  // Tạo state để lưu trữ dữ liệu từ API
  const [data, setData] = useState({
    totalCampaigns: 0,
    totalFund: 0,
    ongoingCampaigns: 0,
    upcomingCampaigns: 0,
    endedCampaigns: 0,
  });

  // Sử dụng useEffect để gọi API khi component được mount
  useEffect(() => {
    // Định nghĩa hàm fetchData
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost/bwd/VietNamJourney/Server/ChienDich/getprovince.php?province=${province}`);
        // Cập nhật state với dữ liệu từ API
        if (response.data) {
          setData({
            totalCampaigns: response.data.campaignIng + response.data.campaignWill + response.data.campaignEd,
            totalFund: response.data.money,
            ongoingCampaigns: response.data.campaignIng,
            upcomingCampaigns: response.data.campaignWill,
            endedCampaigns: response.data.campaignEd,
          });
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      }
    };

    fetchData();
  }, [province]); 


  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  }

  // Tìm URL hình ảnh dựa trên tên tỉnh
  const provinceData = provinces.find(p => p.province === province);
  const imageUrl = provinceData ? provinceData.urlImage : "https://www.pullman-danang.com/wp-content/uploads/sites/86/2019/05/DJI_0004.jpg"; // Đặt URL mặc định nếu không tìm thấy tỉnh

  return (
    <div className={className}>
      <div className={cx('info')}>
        <img src={imageUrl} alt={`Ảnh của ${province}`} className={cx('province-image')} />
        <div className={cx('title')}>
          Tổng quan - <span>{province}</span>
        </div>
        <hr />
        <div className={cx('total', 'row')}>
          <div className={cx('total-campaign', 'col-4')}>
            <p>Tổng số chiến dịch</p>
            <div className={cx('number')}>{data.totalCampaigns}</div>
          </div>
          <div className={cx('total-fund', 'col-8')}>
            <p>Tổng số tiền quỹ VIETNAMJOURNEY tài trợ</p>
            <div className={cx('number')}>{formatCurrency(data.totalFund)}</div>
          </div>
        </div>
        <div className={cx('detail', 'row')}>
          <div className={cx('section-campaign', 'col-4')}>
            <p>Chiến dịch đang diễn ra</p>
            <div className={cx('number')}>{data.ongoingCampaigns}</div>
          </div>
          <div className={cx('section-campaign', 'col-4')}>
            <p>Chiến dịch sắp tới</p>
            <div className={cx('number')}>{data.upcomingCampaigns}</div>
          </div>
          <div className={cx('section-campaign', 'col-4')}>
            <p>Chiến dịch đã kết thúc</p>
            <div className={cx('number')}>{data.endedCampaigns}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;

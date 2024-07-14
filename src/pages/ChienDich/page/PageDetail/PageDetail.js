
import classNames from "classnames/bind";
import style from './PageDetail.module.scss';
import { useEffect, useState, useRef } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Sử dụng axios để gọi API
import TongQuan from "./TongQuan/TongQuan";
import TacDong from "./TacDong/TacDong";
import ChiTiet from "./ChiTiet/ChiTiet";
import ThongTinThem from "./ThongTinThem/ThongTinThem";
import { Spin } from 'antd';

const cx = classNames.bind(style);

function PageDetail() {
  const [activeSection, setActiveSection] = useState('tongQuan');
  const [campaign, setCampaign] = useState(null); // State để lưu trữ thông tin chiến dịch
  const location = useLocation();

  const tongQuanRef = useRef(null);
  const tacDongRef = useRef(null);
  const chiTietRef = useRef(null);
  const thongTinThemRef = useRef(null);

  const scrollToSection = (sectionRef, sectionName, offset = 60) => {
    const elementPosition = sectionRef.current.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });

    setActiveSection(sectionName);
  };

  // Lấy thông tin từ query params
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  
    if (id) {
      axios.get(`http://localhost:8000/api/getCampaign/${id}`)
        .then(response => {
          console.log(response.data); // Log dữ liệu để kiểm tra
          setCampaign(response.data); // Lưu dữ liệu vào state
        })
        .catch(error => {
          console.error('Error fetching campaign data:', error);
        });
    }
  }, [id]);

  if (!campaign) {
    return (
      <div className={cx('centeredSpin')}>
        <Spin size="large" />
      </div>
    );
  }

  const myStyle = {
    backgroundImage: `url(http://localhost:8000/${campaign.image})`, // Sử dụng dữ liệu hình ảnh từ API
    backgroundSize: 'cover',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu đen trong suốt với độ mờ 50%
    backgroundBlendMode: 'multiply', // Áp dụng chế độ kết hợp 'multiply' để làm cho ảnh nền bị tối đi
  };

  return (
    <div className={cx('PageDetail')}>
      <div className={cx('header')} style={myStyle}>
        <p className={cx('title')}>Dự án & Chiến dịch</p>
        <p className={cx('camp-id')}>FP{campaign.id}</p>
        <p className={cx('desc')}>{campaign.name}</p>
      </div>
      <div className={cx('menu')}>
        <ul>
          <li
            className={cx({ 'active': activeSection === 'tongQuan' })}
            onClick={() => scrollToSection(tongQuanRef, 'tongQuan')}
          >
            Tổng quan
          </li>
          <li
            onClick={() => scrollToSection(tacDongRef, 'tacDong')}
            className={cx({ 'active': activeSection === 'tacDong' })}
          >
            Tác động
          </li>
          <li
            onClick={() => scrollToSection(chiTietRef, 'chiTiet')}
            className={cx({ 'active': activeSection === 'chiTiet' })}
          >
            Chi tiết
          </li>
          <li
            onClick={() => scrollToSection(thongTinThemRef, 'thongTinThem')}
            className={cx({ 'active': activeSection === 'thongTinThem' })}
          >
            Thông tin thêm
          </li>
        </ul>
      </div>
      <div ref={tongQuanRef}><TongQuan campaign={campaign} /></div>
      <div ref={tacDongRef}><TacDong campaign={campaign} /></div>
      <div ref={chiTietRef}><ChiTiet campaign={campaign} /></div>
      <div ref={thongTinThemRef}><ThongTinThem campaign={campaign} /></div>
    </div>
  );
}

export default PageDetail;

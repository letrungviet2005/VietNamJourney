import classNames from "classnames/bind";
import style from './PageDetail.module.scss';
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import TongQuan from "./TongQuan/TongQuan";
import TacDong from "./TacDong/TacDong";
import ChiTiet from "./ChiTiet/ChiTiet";
import ThongTinThem from "./ThongTinThem/ThongTinThem";

const cx = classNames.bind(style);

function PageDetail() {
  const location = useLocation(); // Hook để lấy thông tin location hiện tại
  const { imageUrl, campId, desc } = location.state || {}; // Lấy dữ liệu từ state hoặc đặt mặc định là {} nếu không có

  const [activeSection, setActiveSection] = useState('tongQuan);

  const tongQuanRef = useRef(null);
  const tacDongRef = useRef(null);
  const chiTietRef = useRef(null);
  const thongTinThemRef = useRef(null);
  // const scrollToSection = (sectionRef, sectionName) => {
  //   sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  //   setActiveSection(sectionName);
  // };

  const scrollToSection = (sectionRef, sectionName, offset = 60) => {
    // Lấy vị trí của phần tử mục tiêu
    const elementPosition = sectionRef.current.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    // Cuộn đến vị trí với offset
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });

    // Cập nhật trạng thái active
    setActiveSection(sectionName);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const myStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu đen trong suốt với độ mờ 50%
    backgroundBlendMode: 'multiply', // Áp dụng chế độ kết hợp 'multiply' để làm cho ảnh nền bị tối đi
  };

  return (  
    <div className={cx('PageDetail')}>
      <div className={cx('header')} style={myStyle}>
        <p className={cx('title')}>Dự án & Chiến dịch</p>
        <p className={cx('camp-id')}>{campId}</p>
        <p className={cx('desc')}>{desc}</p>
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
      <div ref={tongQuanRef}><TongQuan /></div>
      <div ref={tacDongRef}><TacDong /></div>
      <div ref={chiTietRef}><ChiTiet /></div>
      <div ref={thongTinThemRef}><ThongTinThem /></div>
    </div>
  );
}

export default PageDetail;
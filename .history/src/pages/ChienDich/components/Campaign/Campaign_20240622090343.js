import classNames from "classnames/bind";
import style from './Campaign.module.scss';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useCheckCookie } from "../../../../Cookie/getCookie";

const cx = classNames.bind(style);

function Campaign({ className='col-12', campId, campType='TÌNH NGUYỆN', title, desc, imageUrl }) {
  const myStyle = {
    backgroundImage: `url(data:image/jpg;base64,${imageUrl})`,
    backgroundSize: 'cover',
    backgroundBlendMode: 'multiply', // Áp dụng chế độ kết hợp 'multiply' để làm cho ảnh nền bị tối đi
  };

  const navigate = useNavigate();
  const handleButtonClick = () => {
    const id = useCheckCookie('User_ID', '/TaiKhoan');
    // Điều hướng đến đường dẫn mục tiêu
    navigate('/campaign-detail/?id=' + campId);
  };

  return ( 
    <div className={className} style={{padding: '0px 35px'}}>
      <div className={cx('Campaign')} style={myStyle}>
        <div className={cx('camp-id')}>FP{campId}</div>
        <div className={cx('camp-type')}>{campType}</div>
        <h2 className={cx('title')}>{title}</h2>
        <p className={cx('desc')}>{desc}</p>
        <button className={cx('button')} onClick={handleButtonClick}>Chi tiết</button>
      </div>
    </div>
  );
}

export default Campaign;
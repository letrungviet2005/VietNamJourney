import classNames from "classnames/bind";
import style from './Campaign.module.scss';
import { useState } from "react";

const cx = classNames.bind(style);

function Campaign({ className, campId, campType, title, desc, imageUrl }) {
  const myStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundBlendMode: 'multiply', // Áp dụng chế độ kết hợp 'multiply' để làm cho ảnh nền bị tối đi
  };

  return ( 
    <div className={className} style={{padding: '0px 35px'}}>
      <div className={cx('Campaign')} style={myStyle}>
        <div className={cx('camp-id')}>{campId}</div>
        <div className={cx('camp-type')}>{campType}</div>
        <h2 className={cx('title')}>{title}</h2>
        <p className={cx('desc')}>{desc}</p>
        <button className={cx('button')}>Chi tiết</button>
      </div>
    </div>
  );
}

export default Campaign;
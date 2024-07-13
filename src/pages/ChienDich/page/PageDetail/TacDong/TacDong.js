import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import style from './TacDong.module.scss';
import CountUp from 'react-countup';

const cx = classNames.bind(style);

function TacDong({ campaign }) {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      });
    });

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const totalMoney = campaign.totalMoney;
  const moneyByVNJN = campaign.moneyByVNJN;

  return (
    <div className={cx('TacDong')} ref={componentRef}>
      <div className={cx('row')}>
        <div className={cx('col-xl-6', 'col-lg-6', 'col-md-6', 'col-sm-6', 'col-12')}>
          <div className={cx('title', 'left')}>
            Tổng giá trị dự án
          </div>
          <div className={cx('number')}>
            {isVisible && (
              <CountUp
                end={totalMoney}
                duration={1}
                formattingFn={(value) => value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              />
            )}
          </div>
        </div>
        <div className={cx('col-xl-6', 'col-lg-6', 'col-md-6', 'col-sm-6', 'col-12')}>
          <div className={cx('title')}>
            Quỹ VIETNAM JOURNEY tài trợ
          </div>
          <div className={cx('number')}>
            {isVisible && (
              <CountUp
                end={moneyByVNJN}
                duration={1}
                formattingFn={(value) => value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              />
            )}
          </div>
        </div>
      </div>
      <div className={cx('row')}>
        <div className={cx('col-xl-6', 'col-lg-6', 'col-md-6', 'col-sm-6', 'col-12')}>
          <div className={cx('title', 'left')}>
            Mục tiêu dự án
          </div>
          <div className={cx('desc')}>
            Môi trường
          </div>
        </div>
        <div className={cx('col-xl-6', 'col-lg-6', 'col-md-6', 'col-sm-6', 'col-12')}>
          <div className={cx('title')}>
            Có tác động đến các lĩnh vực
          </div>
          <div className={cx('icon')}>
            <ul>
              <li><i className="fa-solid fa-city"></i></li>
              <li className={cx('mo')}><i className="fa-solid fa-seedling"></i></li>
              <li><i className="fa-solid fa-charging-station"></i></li>
              <li className={cx('mo')}><i className="fa-solid fa-droplet"></i></li>
              <li><i className="fa-solid fa-heart-pulse"></i></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TacDong;

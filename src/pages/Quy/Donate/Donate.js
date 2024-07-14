import classNames from "classnames/bind";
import style from './Donate.module.css';

import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import axios from "axios";

import support1 from '../../../Images/Quy/Donate/support1.png';
import support2 from '../../../Images/Quy/Donate/support2.png';
import support3 from '../../../Images/Quy/Donate/support3.png';

const cx = classNames.bind(style);

function CoDonate() {

  let MY_BANK = {
    BANK_ID: "MB",
    ACCOUNT_NO: "0979727604"
  }
  // State quản lý thông tin form
  const [formData, setFormData] = useState({
    senderName: '',
    amount: ''
  });

  // Hàm xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const [isVisible, setIsVisible] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State để quản lý modal
  const [showSuccessModalHistory, setShowSuccessModalHistory] = useState(false);


  // Hàm xử lý khi gửi form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    // Cập nhật state để hiển thị QR code
    setShowQR(true);
  };

  const fetchTransactionHistory = async () => {
    try {
      const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=e4mGsq58YbWsqYFIvfeutqud89CuN7-6Zka2Y9Wfi7w0-hew7IAJDxpsy9EWpj7OGFjYtJHlp_NiJEtqIXvo24w0gn0TKjsAm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHGmiWCNwSHgZ1q_skok2PqVzpAAKpwAmAlMZKCpEUBOWa60WJAGy9Sr3NxTdlSzLoUz1ZCzqCiy-unVfR6907llWsG3c7_bd9z9Jw9Md8uu&lib=MVFUzX_6n49ZAW6KvgD0y-3r7BlUAkecM');
      const data = await response.json();
      if (!data.error) {
        setTransactionHistory(data.data);
        console.log(data.data);
        const lastPaid = data.data[data.data.length - 1];
        // Kiểm tra nếu giao dịch đã được thực hiện
        const isPaymentMade = lastPaid["Giá trị"]  == formData.amount? true : false;
        console.log(lastPaid["Giá trị"], formData.amount);
        console.log("isPaymentMade", isPaymentMade);
        if (isPaymentMade) {
          setShowQR(false); // Ẩn QR nếu thanh toán đã được thực hiện
          setFormData({
            senderName: '',
            amount: ''
          })
        }
      } else {
        console.error('Error fetching transaction history');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    let intervalId;
    let timeoutId;
    if (showQR) {
      // Gọi API ngay lập tức khi QR được hiển thị
      fetchTransactionHistory();
      // Thiết lập interval để gọi API mỗi giây
      intervalId = setInterval(fetchTransactionHistory, 1000);

      timeoutId = setTimeout(() => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      }, 180000);
    }
    return () => {
      // Xóa interval khi component unmount hoặc khi showQR trở thành false
      if (intervalId) {
        clearInterval(intervalId);
        setShowSuccessModal(true);
        console.log("showSuccessModal", showSuccessModal);
      }
      // Xóa timeout khi component unmount hoặc khi showQR trở thành false
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showQR]);

  const viewHistory = () => {
    setShowSuccessModalHistory(true);
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  const closeModalHistory = () => {
    setShowSuccessModalHistory(false);
  };


    fetchTransactionHistory();

    return(
        <div className={cx('main')}>

            <div className={cx('top')}>
                <h2>Bắt đầu hành trình của bạn với chúng tôi</h2>

                <p>Quỹ VIETNAM JOURNEY cam kết sử dụng toàn bộ số tiền vào các dự án có mục tiêu môi trường.<br></br>
                Đồng thời cam kết theo dõi và báo cáo thường xuyên về hiệu quả môi trường của các dự án mà chúng tôi hỗ trợ.</p>
            </div>


            {/* <div className={styles.bot}>
                <div className={styles.div_left}>
                    <p>Hình thức chuyển khoản</p>

                    <img alt="^_^" src={support1}></img>
                </div>


                <div className={styles.div_right}>
                    <p className={styles.p1}>Hình thức khác</p>

                    <div className={styles.part1}>
                        <img alt=">_<" src={support2} className={styles.img2}></img>

                        <img alt=">_<" src={support3} className={styles.img3}></img>
                    </div>

                    <p className={styles.p2}><span className={styles.span1}>Văn phòng đại diện dự án VIETNAM JOURNEY</span><br></br>
                    Địa chỉ: 144 Trần Đại Nghĩa, Đà Nẵng<br></br>
                    Hotline: 19001234</p>
                </div>

            </div> */}

            <div className={cx('donate')}>
            <button className={cx('button-history')} onClick={viewHistory}><i class="fa-solid fa-eye"></i> Lịch sử quyên góp</button>
              <div className={cx('row', 'quy')}>
                <form onSubmit={handleSubmit} className={cx('transfer-form')}>
                  <div className={cx("title")}>Quyên góp vào quỹ VIỆT NAM JOURNEY</div>
                  <div className={cx('form-group')}>
                    <label htmlFor="senderName" className="form-label">Tên người quyên góp</label>
                    <input
                      type="text"
                      id="senderName"
                      name="senderName"
                      className="form-control"
                      value={formData.senderName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={cx('form-group')}>
                    <label htmlFor="amount" className="form-label">Số tiền quyên góp</label>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      className="form-control"
                      value={formData.amount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={cx('button')}><button type="submit">Quyên góp</button></div>
                </form>

                {showQR && (
                  <div className={cx('img-qr')}>
                    <img src={`https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${MY_BANK.ACCOUNT_NO }-compact2.png?amount=${formData.amount}&addInfo=${formData.senderName} quyên góp vao quỹ VNJN&accountName=QUY VIETNAM JOURNEY`} alt="QR Code" />
                  </div>
                )}
              </div>
            </div>


            <Modal
        isOpen={showSuccessModal}
        onRequestClose={closeModal}
        contentLabel="Donation Successful"
        className={cx('modal')}
        overlayClassName={cx('overlay')}
      >
        <h2>Quyên góp thành công!</h2>
        <p>Cảm ơn bạn đã quyên góp vào quỹ VIỆT NAM JOURNEY.</p>
        <button onClick={closeModal}>Đóng</button>
      </Modal>

      <Modal
        isOpen={showSuccessModalHistory}
        onRequestClose={closeModalHistory}
        contentLabel="Donation Successful"
        className={cx('modal-history')}
        overlayClassName={cx('overlay-history')}
      >
        <div className={cx('transaction-history')}>
          <h3>Lịch sử giao dịch</h3>
          <ul>
          {transactionHistory.slice().reverse().map((transaction, index) => {
            // Kiểm tra xem transaction['Mô tả'] có chứa FP${campaign.id} hay không
            if (transaction['Mô tả'].includes(`VNJN`)) {
              return (
                <li key={index}>
                  <div className={cx('name')}>{transaction['Mô tả'].split(' ').slice(2, transaction['Mô tả'].split(' ').indexOf('quyen')).join(' ')}</div>
                  <div>Số tiền quyên góp: <span>{parseInt(transaction["Giá trị"], 10).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}</span></div>
                  <div>Mã giao dịch: {transaction['Mã GD']}</div>
                  <div>Thời gian giao dịch: {transaction['Ngày diễn ra']}</div>
                </li>
              );
            } else {
              return null; // Không hiển thị nếu không có chuỗi FP${campaign.id}
            }
          })}
          </ul>
        </div>
      </Modal>

        </div>
    );
}


export default CoDonate
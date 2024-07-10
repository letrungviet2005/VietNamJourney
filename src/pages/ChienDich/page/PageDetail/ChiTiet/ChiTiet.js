import classNames from "classnames/bind";
import style from "./ChiTiet.module.scss";
import { useState, useEffect } from "react"; // Import useEffect
import { getCookie } from "../../../../../Cookie/getCookie";
import Modal from 'react-modal';

const cx = classNames.bind(style);

function ChiTiet({ campaign }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // State to keep track of volunteer status

  // Function to handle the button click
  const handleRegisterClick = async () => {
    setLoading(true);

    const payload = {
      userId: getCookie('User_ID'), // Replace with dynamic user ID
      campaignId: campaign.id,
      status: 1,
    };

    try {
      const response = await fetch('http://localhost/bwd/VietNamJourney/Server/ChienDich/Register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsRegistered(true);
        setStatus(1); // Update the status to 1 after registration
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert('Đăng ký tham gia thất bại. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch the status from the API
  const fetchVolunteerStatus = async () => {
    const payload = {
      userId: getCookie('User_ID'), // Replace with dynamic user ID
      campaignId: campaign.id,
    };

    try {
      const response = await fetch('http://localhost/bwd/VietNamJourney/Server/ChienDich/GetVolunteer.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setStatus(data.status); // Set the status from API response
      } else {
        console.error('Failed to fetch volunteer status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // useEffect to call fetchVolunteerStatus on mount
  useEffect(() => {
    fetchVolunteerStatus();
  }, [campaign.id]);

  let MY_BANK = {
    BANK_ID: "MB",
    ACCOUNT_NO: "0979727604"
  }

  let link_qr = `https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${MY_BANK.ACCOUNT_NO }-compact2.png?amount=10000000&addInfo=Quyên góp quỹ chiến dịch FP${campaign.id}&accountName=TỔ CHỨC VIETNAM JOURNEY`

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
  const toggleVisibility = () => {
    if (!isVisible) {
      fetchTransactionHistory();
    }
    setIsVisible(!isVisible);
  };

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

  return (
    console.log("joined ", campaign.joined),
    <div className={cx("ChiTiet")}>
      <div className={cx("row")}>
        <div className={cx('col-xl-6', 'col-lg-6', 'col-md-6', 'col-sm-12','col-12', "left")}>
          <hr />
          <div className={cx("title")}>Thời gian dự án</div>
          <div className={cx("time")}>
            <div className={cx("inner-title")}>Giai đoạn ban đầu</div>
            <div className={cx("desc")}>{campaign.timeline[0].value}</div>
            <div className={cx("inner-title")}>Bắt đầu dự án</div>
            <div className={cx("desc")}>{campaign.timeline[1].value}</div>
            <div className={cx("inner-title")}>Kết thúc dự án</div>
            <div className={cx("desc")}>{campaign.timeline[2].value}</div>
            <div className={cx("inner-title")}>Tổng kết dự án</div>
            <div className={cx("desc")}>{campaign.timeline[3].value}</div>
          </div>
        </div>
        <div className={cx('col-xl-6', 'col-lg-6', 'col-md-6', 'col-sm-12','col-12', "right")}>
          <hr />
          <div className={cx("title")}>Đăng ký tham gia</div>
          <div className={cx("register")}>
            <div className={cx("desc")}>Số lượng TNV tham gia: {campaign.joined} TNV</div>
            {status === null && <button className={cx("button")} onClick={handleRegisterClick}>Đăng ký tham gia</button>}
            {status === 0 && (
              <button
                className={cx("button")}
                onClick={handleRegisterClick}
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Đăng ký tham gia"}
              </button>
            )}
            {status === 1 && (
              <button className={cx("button")} disabled>
                Đang chờ duyệt
              </button>
            )}
            {status === 2 && null} {/* Button is hidden when status is 2 */}
          </div>
          <hr />
          <div className={cx("title")}>Địa điểm cụ thể</div>
          <pre className={cx("desc")}>{campaign.location}</pre>
        </div>
      </div>

      <div className={cx("quy-row")}>
        <hr />
        <div className={cx("title")} onClick={toggleVisibility} style={{ cursor: 'pointer' }}>
        Quyên góp <i className={`fa-solid ${isVisible ? 'fa-caret-down' : 'fa-caret-right'}`}></i>
      </div>

      {isVisible && (
        <div>
          <button className={cx('button-history')} onClick={viewHistory}><i class="fa-solid fa-eye"></i> Lịch sử quyên góp</button>
          <div className={cx('row', 'quy')}>
            <form onSubmit={handleSubmit} className={cx('transfer-form')}>
              <div className={cx("title")}>Quyên góp vào quỹ chiến dịch FP{campaign.id}</div>
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
                <img src={`https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${MY_BANK.ACCOUNT_NO }-compact2.png?amount=${formData.amount}&addInfo=${formData.senderName} quyên góp vao quỹ FP${campaign.id}&accountName=QUY VIETNAM JOURNEY`} alt="QR Code" />
              </div>
            )}
          </div>
        </div>
      )}
      </div>

      {/* {showQR && transactionHistory.length > 0 && (
        <div className={cx('transaction-history')}>
          <h3>Lịch sử giao dịch</h3>
          <ul>
            {transactionHistory.map((transaction, index) => (
              <li key={index}>
                <p>Mã GD: {transaction['Mã GD']}</p>
                <p>Mô tả: {transaction['Mô tả']}</p>
                <p>Giá trị: {transaction['Giá trị']}</p>
                <p>Ngày diễn ra: {transaction['Ngày diễn ra']}</p>
                <p>Số tài khoản: {transaction['Số tài khoản']}</p>
              </li>
            ))}
          </ul>
        </div>
      )} */}

      <Modal
        isOpen={showSuccessModal}
        onRequestClose={closeModal}
        contentLabel="Donation Successful"
        className={cx('modal')}
        overlayClassName={cx('overlay')}
      >
        <h2>Quyên góp thành công!</h2>
        <p>Cảm ơn bạn đã quyên góp vào quỹ chiến dịch FP{campaign.id}.</p>
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
            if (transaction['Mô tả'].includes(`FP${campaign.id}`)) {
              return (
                <li key={index}>
                  <div className={cx('name')}>{transaction['Mô tả'].split(' ').slice(2, transaction['Mô tả'].split(' ').indexOf('quyen')).join(' ')}</div>
                  <div>Số tiền quyên góp: {transaction['Giá trị']} VND</div>
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

      <div className={cx("line")}></div>
    </div>
  );
}

export default ChiTiet;

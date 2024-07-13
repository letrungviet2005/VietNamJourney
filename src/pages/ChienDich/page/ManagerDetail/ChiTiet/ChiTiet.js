import classNames from "classnames/bind";
import style from "./ChiTiet.module.scss";
import axios from "axios";
import { useState, useEffect } from "react"; // Import useEffect
import { getCookie } from "../../../../../Cookie/getCookie";
import Modal from "react-modal";

const cx = classNames.bind(style);

function ChiTiet({ campaign }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // State to keep track of volunteer status

  // Function to fetch the status from the API
  const fetchVolunteerStatus = async () => {
    const payload = {
      userId: getCookie("User_ID"), // Replace with dynamic user ID
      campaignId: campaign.id,
    };

    try {
      const response = await fetch(
        "http://localhost/bwd/VietNamJourney/Server/ChienDich/GetVolunteer.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setStatus(data.status); // Set the status from API response
      } else {
        console.error("Failed to fetch volunteer status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // useEffect to call fetchVolunteerStatus on mount
  useEffect(() => {
    fetchVolunteerStatus();
  }, [campaign.id]);

  let MY_BANK = {
    BANK_ID: "MB",
    ACCOUNT_NO: "0979727604",
  };

  let link_qr = `https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${MY_BANK.ACCOUNT_NO}-compact2.png?amount=10000000&addInfo=Quyên góp quỹ chiến dịch FP${campaign.id}&accountName=TỔ CHỨC VIETNAM JOURNEY`;

  // State quản lý thông tin form
  const [formData, setFormData] = useState({
    senderName: "",
    amount: "",
  });

  // Hàm xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [isVisible, setIsVisible] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State để quản lý modal
  const [showSuccessModalHistory, setShowSuccessModalHistory] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const toggleVisibility = () => {
    if (!isVisible) {
      fetchTransactionHistory();
    }
    setIsVisible(!isVisible);
  };

  // Hàm xử lý khi gửi form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Cập nhật state để hiển thị QR code
    setShowQR(true);
  };

  const fetchTransactionHistory = async () => {
    try {
      const response = await fetch(
        "https://script.googleusercontent.com/macros/echo?user_content_key=e4mGsq58YbWsqYFIvfeutqud89CuN7-6Zka2Y9Wfi7w0-hew7IAJDxpsy9EWpj7OGFjYtJHlp_NiJEtqIXvo24w0gn0TKjsAm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHGmiWCNwSHgZ1q_skok2PqVzpAAKpwAmAlMZKCpEUBOWa60WJAGy9Sr3NxTdlSzLoUz1ZCzqCiy-unVfR6907llWsG3c7_bd9z9Jw9Md8uu&lib=MVFUzX_6n49ZAW6KvgD0y-3r7BlUAkecM"
      );
      const data = await response.json();
      if (!data.error) {
        setTransactionHistory(data.data);
        console.log(data.data);
        const lastPaid = data.data[data.data.length - 1];
        // Kiểm tra nếu giao dịch đã được thực hiện
        const isPaymentMade =
          lastPaid["Giá trị"] == formData.amount ? true : false;
        console.log(lastPaid["Giá trị"], formData.amount);
        console.log("isPaymentMade", isPaymentMade);
        if (isPaymentMade) {
          setShowQR(false); // Ẩn QR nếu thanh toán đã được thực hiện
          setFormData({
            senderName: "",
            amount: "",
          });
        }
      } else {
        console.error("Error fetching transaction history");
      }
    } catch (error) {
      console.error("Error:", error);
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

  const [currentTab, setCurrentTab] = useState(0);
  const [formValues, setFormValues] = useState({
    fullname: "",
    birth: "",
    phone: "",
    email: "",
    address: "",
    reason: "",
  });

  const showTab = (n) => {
    const x = document.getElementsByClassName(cx("step"));
    for (let i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    x[n].style.display = "block";

    if (n === 0) {
      document.getElementById(cx("prevBtn")).style.display = "none";
    } else {
      document.getElementById(cx("prevBtn")).style.display = "inline";
    }
    if (n === x.length - 1) {
      // document.getElementById(cx("nextBtn")).type = "submit";
      document.getElementById(cx("nextBtn")).innerHTML = "Đăng ký";
    } 
    else {
      document.getElementById(cx("nextBtn")).innerHTML = "Tiếp theo";
      // document.getElementById(cx("nextBtn")).type = "button";
    }

    fixStepIndicator(n);
  };

  const nextPrev = (n) => {
    const x = document.getElementsByClassName(cx("step"));
    if (n === 1 && !validateForm()) return false;
    x[currentTab].style.display = "none";
    setCurrentTab(currentTab + n);
    if (currentTab + n >= x.length) {
      // document.getElementById(cx("signUpForm")).submit();
      handleRegisterSubmit();
      return false;
    }
    showTab(currentTab + n);
  };

  const validateForm = () => {
    let valid = true;
    const x = document.getElementsByClassName(cx("step"));
    const y = x[currentTab].getElementsByTagName("input");
    const z = x[currentTab].getElementsByTagName("textarea");
    for (let i = 0; i < y.length; i++) {
      if (y[i].value === "") {
        y[i].className += ` ${cx("invalid")}`;
        valid = false;
      }
    }
    for (let i = 0; i < z.length; i++) {
      if (z[i].value === "") {
        z[i].className += ` ${cx("invalid")}`;
        valid = false;
      }
    }
    if (valid) {
      document.getElementsByClassName(cx("stepIndicator"))[
        currentTab
      ].className += ` ${cx("finish")}`;
    }
    return valid;
  };

  const fixStepIndicator = (n) => {
    const x = document.getElementsByClassName(cx("stepIndicator"));
    for (let i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(` ${cx("active")}`, "");
    }
    x[n].className += ` ${cx("active")}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
  };
  
  const closeRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const handleRegisterSubmit = async () => {
    // e.preventDefault();
    
    const formData = new FormData();
    formData.append('fullname', formValues.fullname);
    formData.append('birth', formValues.birth);
    formData.append('phone', formValues.phone);
    formData.append('email', formValues.email);
    formData.append('address', formValues.address);
    formData.append('reason', formValues.reason);
    formData.append('userId', getCookie("User_ID")); // Bạn cần lấy userId từ đâu đó
    formData.append('campaignId', campaign.id);
    formData.append('status', 1); // Bạn cần lấy status từ đâu đó

    // console.log formdata
    for (const pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/registerVolunteer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("okkk");
      if (response.status === 201) {
        alert(response.data.message);
        closeRegisterModal();
        // Xử lý thành công
      } else {
        alert(response.data.error);
        // Xử lý lỗi
      }
    } catch (error) {
      alert('Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  };



  return (
    console.log("joined ", campaign.joined),
    (
      <div className={cx("ChiTiet")}>
        <div className={cx("row")}>
          <div
            className={cx(
              "col-xl-6",
              "col-lg-6",
              "col-md-6",
              "col-sm-12",
              "col-12",
              "left"
            )}
          >
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
          <div
            className={cx(
              "col-xl-6",
              "col-lg-6",
              "col-md-6",
              "col-sm-12",
              "col-12",
              "right"
            )}
          >
            <hr />
            <div className={cx("title")}>Đăng ký tham gia</div>
            <div className={cx("register")}>
              <div className={cx("desc")}>
                Số lượng TNV tham gia: {campaign.joined} 24 TNV
              </div>
              {status === null && (
                <button className={cx("button")} onClick={handleRegisterClick}>
                  Đăng ký tham gia
                </button>
              )}
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

        <div className={cx("plan-row")}>
          <hr />
          <div className={cx("title")}>Kế hoạch chiến dịch</div>
          <pre className={cx("desc")}>
            <div dangerouslySetInnerHTML={{ __html: campaign.description }} />
          </pre>
        </div>

        {/* <div className={cx("quy-row")}>
          <hr />
          <div
            className={cx("title")}
            onClick={toggleVisibility}
            style={{ cursor: "pointer" }}
          >
            Quyên góp{" "}
            <i
              className={`fa-solid ${
                isVisible ? "fa-caret-down" : "fa-caret-right"
              }`}
            ></i>
          </div>

          {isVisible && (
            <div>
              <button className={cx("button-history")} onClick={viewHistory}>
                <i class="fa-solid fa-eye"></i> Lịch sử quyên góp
              </button>
              <div className={cx("row", "quy")}>
                <form onSubmit={handleSubmit} className={cx("transfer-form")}>
                  <div className={cx("title")}>
                    Quyên góp vào quỹ chiến dịch FP{campaign.id}
                  </div>
                  <div className={cx("form-group")}>
                    <label htmlFor="senderName" className="form-label">
                      Tên người quyên góp
                    </label>
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
                  <div className={cx("form-group")}>
                    <label htmlFor="amount" className="form-label">
                      Số tiền quyên góp
                    </label>
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
                  <div className={cx("button")}>
                    <button type="submit">Quyên góp</button>
                  </div>
                </form>

                {showQR && (
                  <div className={cx("img-qr")}>
                    <img
                      src={`https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${MY_BANK.ACCOUNT_NO}-compact2.png?amount=${formData.amount}&addInfo=${formData.senderName} quyên góp vao quỹ FP${campaign.id}&accountName=QUY VIETNAM JOURNEY`}
                      alt="QR Code"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div> */}

        <Modal
          isOpen={showSuccessModal}
          onRequestClose={closeModal}
          contentLabel="Donation Successful"
          className={cx("modal")}
          overlayClassName={cx("overlay")}
        >
          <h2>Quyên góp thành công!</h2>
          <p>Cảm ơn bạn đã quyên góp vào quỹ chiến dịch FP{campaign.id}.</p>
          <button onClick={closeModal}>Đóng</button>
        </Modal>

        <Modal
          isOpen={showSuccessModalHistory}
          onRequestClose={closeModalHistory}
          contentLabel="Donation Successful"
          className={cx("modal-history")}
          overlayClassName={cx("overlay-history")}
        >
          <div className={cx("transaction-history")}>
            <h3>Lịch sử giao dịch</h3>
            <ul>
              {transactionHistory
                .slice()
                .reverse()
                .map((transaction, index) => {
                  // Kiểm tra xem transaction['Mô tả'] có chứa FP${campaign.id} hay không
                  if (transaction["Mô tả"].includes(`FP${campaign.id}`)) {
                    return (
                      <li key={index}>
                        <div className={cx("name")}>
                          {transaction["Mô tả"]
                            .split(" ")
                            .slice(
                              2,
                              transaction["Mô tả"].split(" ").indexOf("quyen")
                            )
                            .join(" ")}
                        </div>
                        <div>
                          Số tiền quyên góp: {transaction["Giá trị"]} VND
                        </div>
                        <div>Mã giao dịch: {transaction["Mã GD"]}</div>
                        <div>
                          Thời gian giao dịch: {transaction["Ngày diễn ra"]}
                        </div>
                      </li>
                    );
                  } else {
                    return null; // Không hiển thị nếu không có chuỗi FP${campaign.id}
                  }
                })}
            </ul>
          </div>
        </Modal>

        <Modal
          isOpen={showRegisterModal}
          onRequestClose={closeRegisterModal}
          contentLabel="Register"
          className={cx("modal-register")}
          overlayClassName={cx("overlay-history")}
        >
          <form id={cx("signUpForm")} > {/* onSubmit={handleSubmit} */}
            <div className={cx("form-header", "d-flex", "mb-4")}>
              <span className={cx("stepIndicator")}>Thông tin cá nhân</span>
              <span className={cx("stepIndicator")}>Lý do tham gia</span>
              <span className={cx("stepIndicator")}>Quy tắc chiến dịch</span>
            </div>

            <div
              className={cx("step")}
              style={{ display: currentTab === 0 ? "block" : "none" }}
            >
              <p className="text-center mb-4">Điền thông tin cá nhân của bạn</p>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Họ và tên"
                  onInput={(e) => {
                    e.target.className = "";
                    handleChange(e);
                  }}
                  name="fullname"
                  value={formValues.fullname}
                />
              </div>
              <div className="mb-3">
                <input
                  type="date"
                  placeholder="Ngày sinh"
                  onInput={(e) => {
                    e.target.className = "";
                    handleChange(e);
                  }}
                  name="birth"
                  value={formValues.birth}
                />
              </div>
              <div className="mb-3">
                <input
                  type="tel"
                  placeholder="Số điện thoại"
                  onInput={(e) => {
                    e.target.className = "";
                    handleChange(e);
                  }}
                  name="phone"
                  value={formValues.phone}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Email"
                  onInput={(e) => {
                    e.target.className = "";
                    handleChange(e);
                  }}
                  name="email"
                  value={formValues.email}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  onInput={(e) => {
                    e.target.className = "";
                    handleChange(e);
                  }}
                  name="address"
                  value={formValues.address}
                />
              </div>

            </div>

            <div
              className={cx("step")}
              style={{ display: currentTab === 1 ? "block" : "none" }}
            >
              <p className="text-center mb-4">
                Tại sao bạn muốn tham gia chiến dịch <b>FP{campaign.id}</b> ?
              </p>
              <div className="mb-3">
                <textarea
                  type="text"
                  onInput={(e) => {
                    e.target.className = "";
                    handleChange(e);
                  }}
                  name="reason"
                  value={formValues.reason}
                />
              </div>
              
            </div>

            <div
              className={cx("step")}
              style={{ display: currentTab === 2 ? "block" : "none" }}
            >
              <p className="text-center mb-4"><b>Quy tắc của chiến dịch</b></p>
              <div className="mb-3">
                <div className={cx("content")}>
                  <p>1. Đảm bảo thông tin cá nhân của bạn cung cấp là chính xác</p>
                  <p>2. Đảm bảo về vấn đề sức khỏe khi tham gia chiến dịch</p>
                  <p>3. Tuân thủ các hướng dẫn của người đứng đầu chiến dịch</p>
                  <p>4. Có mặt đúng giờ và tham gia đầy đủ. Bận việc đột xuất phải thông báo trước cho BTC chiến dịch</p>
                  <p>5. Tích cực tham gia các hoạt động của chiến dịch</p>
                  <p>6. Giữ thái độ lịch sự, tôn trọng các thành viên khác</p>
                  <p>7. Cung cấp phản hồi và báo cáo về hoạt động của mình sau khi chiến dịch kết thúc.</p>
                  <p><b>Hãy cùng nhau hết mình với chiến dịch nhé!</b></p>
                </div>
              </div>
              
            </div>

            <div className={cx("form-footer", "d-flex")}>
              <button
                type="button"
                id={cx("prevBtn")}
                onClick={() => nextPrev(-1)}
                style={{ display: currentTab === 0 ? "none" : "inline" }}
              >
                Quay lại
              </button>
              <button
                type="button"
                id={cx("nextBtn")}
                onClick={() => nextPrev(1)}
              >
                Tiếp theo
              </button>
            </div>
          </form>
        </Modal>

        <div className={cx("line")}></div>
      </div>
    )
  );
}

export default ChiTiet;

import classNames from "classnames/bind";
import style from "./Professional.module.scss";
import axios from "axios";
import { useState, useEffect } from "react"; // Import useEffect
import { getCookie } from "../../../../Cookie/getCookie";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(style);

function Professional() {
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState(0);
  const [formValues, setFormValues] = useState({
    fullname: "",
    birth: "",
    phone: "",
    email: "",
    address: "",
    cccd: "",
    frontImage: null,
    backImage: null,
    reasonCheck: "",
    reasonExperience: "",
    reasonCampaign: "",
    reasonAchievement: "",
  });
  const [frontImagePreview, setFrontImagePreview] = useState(null);
  const [backImagePreview, setBackImagePreview] = useState(null);

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
    } else {
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
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (name === "frontImage") {
          setFrontImagePreview(reader.result);
        } else if (name === "backImage") {
          setBackImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
      setFormValues({ ...formValues, [name]: file });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleRegisterSubmit = async () => {
    alert("Yêu cầu của bạn đã được gửi đến tổ chức thành công!");
    navigate("/TrangChu");
  };

  return (
    <div className={cx("Professional")}>
      <div className={cx("title")}>
        Tài khoản của bạn phải được cấp tích xanh{" "}
        <i class="fa-solid fa-circle-check"></i> để có thể tạo và quản lý chiến
        dịch của chính bạn
      </div>
      <form id={cx("signUpForm")}>
        {" "}
        {/* onSubmit={handleSubmit} */}
        <div className={cx("form-header", "d-flex", "mb-4")}>
          <span className={cx("stepIndicator")}>Thông tin</span>
          <span className={cx("stepIndicator")}>Kinh nghiệm</span>
          <span className={cx("stepIndicator")}>Cam kết</span>
        </div>
        <div
          className={cx("step")}
          style={{ display: currentTab === 0 ? "block" : "none" }}
        >
          <p className="text-center mb-4"><b>Điền thông tin cá nhân của bạn</b></p>
          <div className="row">
            <div className={cx("col-xl-6", "col-lg-12")}>
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
            </div>
            <div className={cx("col-xl-6", "col-lg-12")}>
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
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Căn cước công dân"
                  onInput={(e) => {
                    e.target.className = "";
                    handleChange(e);
                  }}
                  name="cccd"
                  value={formValues.cccd}
                />
              </div>
            </div>

            <div className={cx("col-xl-6", "col-lg-12")}>
              <div className="mb-3">
                <label
                  htmlFor="frontImage"
                  className={cx("custom-file-upload")}
                >
                  Chọn ảnh CCCD mặt trước
                </label>
                <input
                  type="file"
                  id="frontImage"
                  name="frontImage"
                  onChange={handleChange}
                  accept="image/*"
                  className={cx("file-input")}
                />
                {frontImagePreview && (
                  <img
                    src={frontImagePreview}
                    alt="CCCD mặt trước"
                    className={cx("image-preview")}
                  />
                )}
              </div>
            </div>
            <div className={cx("col-xl-6", "col-lg-12")}>
              <div className="mb-3">
                <label htmlFor="backImage" className={cx("custom-file-upload")}>
                  Chọn ảnh CCCD mặt sau
                </label>
                <input
                  type="file"
                  id="backImage"
                  name="backImage"
                  onChange={handleChange}
                  accept="image/*"
                  className={cx("file-input")}
                />
                {backImagePreview && (
                  <img
                    src={backImagePreview}
                    alt="CCCD mặt sau"
                    className={cx("image-preview")}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className={cx("step")}
          style={{ display: currentTab === 1 ? "block" : "none" }}
        >
          {/* <p className="text-center mb-4">
            Tại sao bạn muốn tham gia chiến dịch
          </p> */}
          <div className="mb-3">
            <h6>Lý do bạn muốn được cấp tích xanh?</h6>
            <textarea
              type="text"
              onInput={(e) => {
                e.target.className = "";
                handleChange(e);
              }}
              name="reasonCheck"
              value={formValues.reasonCheck}
            />
          </div>
          <div className="mb-3">
            <h6>Bạn đã có kinh nghiệm gì trong việc quản lý đội nhóm chưa</h6>
            <textarea
              type="text"
              onInput={(e) => {
                e.target.className = "";
                handleChange(e);
              }}
              name="reasonExperience"
              value={formValues.reasonExperience}
            />
          </div>
          <div className="mb-3">
            <h6>
              Liệt kê các chiến dịch đã tham gia? Bạn giữ chức vụ gì trong chiến
              dịch đó
            </h6>
            <textarea
              type="text"
              onInput={(e) => {
                e.target.className = "";
                handleChange(e);
              }}
              name="reasonCampaign"
              value={formValues.reasonCampaign}
            />
          </div>
          <div className="mb-3">
            <h6>
              Các thành tích đạt được trong các hoạt động bảo vệ môi trường mà
              bạn có
            </h6>
            <textarea
              type="text"
              onInput={(e) => {
                e.target.className = "";
                handleChange(e);
              }}
              name="reasonAchievement"
              value={formValues.reasonAchievement}
            />
          </div>
        </div>
        <div
          className={cx("step")}
          style={{ display: currentTab === 2 ? "block" : "none" }}
        >
          <div className="mb-3">
            <div className={cx("content")}>
              <p>
                <b>
                  Bạn phải đảm bảo làm được những điều này nếu được cấp tích
                  xanh:
                </b>
              </p>
              <p>
                1. Khi tạo chiến dịch mới, bạn phải gửi về cho tổ chức để được
                phê duyệt.
              </p>
              <p>
                2. Tất cả thông tin trong chiến dịch phải được kiểm chứng và đảm
                bảo tính chính xác. Người tạo chiến dịch phải chịu trách nhiệm
                về sự minh bạch trong việc sử dụng tài nguyên và ngân sách của
                chiến dịch.
              </p>
              <p>
                3. Chiến dịch phải có mục tiêu rõ ràng, cụ thể và có thể đo
                lường được.{" "}
              </p>
              <p>
                4. Người tạo chiến dịch phải lập kế hoạch chi tiết về các hoạt
                động, phân bổ nguồn lực và thời gian thực hiện.
              </p>
              <p>
                5. Chiến dịch phải tuân thủ tất cả các quy định pháp lý của địa
                phương và quốc gia.
              </p>
              <p>
                6. Người tạo chiến dịch phải đảm bảo rằng các hoạt động không vi
                phạm chính sách của tổ chức.
              </p>
              <p>
                7. Mọi hoạt động trong chiến dịch phải hướng tới việc bảo vệ môi
                trường và không gây hại cho cộng đồng.
              </p>
              <p>
                8. Chiến dịch phải đảm bảo sự tham gia và lợi ích của cộng đồng
                địa phương.
              </p>
              <p>
                9. Người tạo chiến dịch phải xác định các rủi ro tiềm ẩn và lập
                kế hoạch ứng phó phù hợp.
              </p>
              <p>
                10. Trong trường hợp có sự cố, người tạo chiến dịch phải kịp
                thời báo cáo và phối hợp để giải quyết.
              </p>
              <p>
                <b>
                  Chúng tôi sẽ xem xét và phản hồi với yêu cầu cấp tích xanh của
                  bạn sớm nhất có thể!
                </b>
              </p>
            </div>
          </div>
        </div>
        <div
          className={cx(
            "form-footer",
            "d-flex",
            "justify-content-between",
            "row"
          )}
        >
          <div
            className={cx(
              "col-xl-6",
              "col-lg-12",
              "d-flex",
              "justify-content-between",
              "buttons"
            )}
          >
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
        </div>
      </form>
    </div>
  );
}

export default Professional;

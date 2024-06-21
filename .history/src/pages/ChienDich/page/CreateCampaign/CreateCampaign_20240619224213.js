import classNames from "classnames/bind";
import style from "./CreateCampaign.module.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";

const cx = classNames.bind(style);

function CreateCampaign() {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  useEffect(() => {
    // Function to fetch data from JSON file
    const fetchData = async () => {
      try {
        const response = await axios.get("./json_data_vn_units.json");
        setProvinces(response.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu JSON:", error);
      }
    };

    fetchData();
  }, []);

  const handleProvinceChange = (selectedOption) => {
    setSelectedProvince(selectedOption);
    // Find districts for selected province
    const selectedProvinceData = provinces.find(
      (province) => province.Code === selectedOption.value
    );
    if (selectedProvinceData) {
      setDistricts(selectedProvinceData.District);
      setSelectedDistrict(null); // Reset selected district when province changes
    }
  };

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
  };


  // State để quản lý danh sách các thông tin liên hệ
  const [contacts, setContacts] = useState([]);

  // Hàm xử lý khi nhấn button "Thêm thông tin liên hệ"
  const handleAddContactClick = () => {
    setContacts([...contacts, { organizationName: "", contactEmail: "" }]);
  };

  // Hàm xử lý thay đổi thông tin tổ chức
  const handleNameChange = (index, e) => {
    const newContacts = [...contacts];
    newContacts[index].organizationName = e.target.value;
    setContacts(newContacts);
  };

  // Hàm xử lý thay đổi email liên hệ
  const handleEmailChange = (index, e) => {
    const newContacts = [...contacts];
    newContacts[index].contactEmail = e.target.value;
    setContacts(newContacts);
  };



// State để quản lý danh sách các tổ chức hỗ trợ
const [organizationContacts, setOrganizationContacts] = useState([]);

// Hàm xử lý khi nhấn button "Thêm thông tin liên hệ"
const handleAddOrganizationContact = () => {
  setOrganizationContacts([...organizationContacts, { organizationName: '', contactEmail: '' }]);
};

// Hàm xử lý thay đổi thông tin tên tổ chức
const handleOrganizationNameChange = (index, e) => {
  const updatedOrganizationContacts = [...organizationContacts];
  updatedOrganizationContacts[index].organizationName = e.target.value;
  setOrganizationContacts(updatedOrganizationContacts);
};

// Hàm xử lý thay đổi email liên hệ
const handleContactEmailChange = (index, e) => {
  const updatedOrganizationContacts = [...organizationContacts];
  updatedOrganizationContacts[index].contactEmail = e.target.value;
  setOrganizationContacts(updatedOrganizationContacts);
};




// State để lưu trữ URL của ảnh đã chọn
const [selectedImage, setSelectedImage] = useState(null);

// Hàm xử lý khi người dùng chọn ảnh
const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageURL = URL.createObjectURL(file);
    setSelectedImage(imageURL);
  }
};
  

  return (
    <div className={cx("CreateCampaign")}>
      <h1>Tạo chiến dịch mới</h1>
      <div className={cx("image-upload-container")}>
      <div className={cx("button-container")}>
        <input
          type="file"
          accept="image/*"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <label htmlFor="fileInput" className={cx("image-upload-button")}>
          Chọn ảnh
        </label>
      </div>
      {selectedImage && (
        <div className={cx("image-preview-container")}>
          <img src={selectedImage} alt="Ảnh đã chọn" className={cx("image-preview")} />
        </div>
      )}
    </div>

    

      <hr />
      <div className={cx("title")}>Thông tin tổng quan </div>
      <div className={cx("row")}>
        <div className={cx("col-2")}>
          <label for="name" className={cx("name")}>
            Tên chiến dịch:{" "}
          </label>
        </div>
        <div className={cx("col-10")}>
          <textarea
            type="text"
            id="name"
            name="name"
            className={cx("input-name")}
          />
        </div>
      </div>
      <div className={cx("row")}>
        <div className={cx("col-2")}>
          <label for="desc" className={cx("desc")}>
            Mô tả chiến dịch:{" "}
          </label>
        </div>
        <div className={cx("col-10")}>
          <textarea
            type="text"
            id="desc"
            name="desc"
            className={cx("input-desc")}
          />
        </div>
      </div>
      <div className={cx("row")}>
        <div className={cx("col-4")}>
          <label for="dateStart" className={cx("dateStart")}>
            Ngày bắt đầu:{" "}
          </label>
          <input
            type="date"
            id="dateStart"
            name="dateStart"
            className={cx("input-dateStart")}
          />
        </div>

        <div className={cx("col-4")}>
          <label for="dateEnd" className={cx("dateEnd")}>
            Ngày kết thúc:{" "}
          </label>
          <input
            type="date"
            id="dateEnd"
            name="dateEnd"
            className={cx("input-dateEnd")}
          />
        </div>
      </div>

      <form>
        <label htmlFor="province">Tỉnh/thành phố:</label>
        <Select
          id="province"
          options={provinces.map((province) => ({
            value: province.Code,
            label: province.Name,
          }))}
          value={selectedProvince}
          onChange={handleProvinceChange}
          placeholder="Chọn tỉnh/thành phố..."
        />

        <br />
        <br />

        <label htmlFor="district">Huyện/quận:</label>
        <Select
          id="district"
          options={districts.map((district) => ({
            value: district.Code,
            label: district.Name,
          }))}
          value={selectedDistrict}
          onChange={handleDistrictChange}
          placeholder="Chọn huyện/quận..."
          isDisabled={!selectedProvince} // Disable district select until province is selected
        />
      </form>

      <div className={cx("row")}>
        <div className={cx("col-4")}>
          <label for="total-money" className={cx("total-money")}>
            Tổng giá trị dự án:{" "}
          </label>
          <input
            type="number"
            id="total-money"
            name="total-money"
            className={cx("input-total-money")}
          />
        </div>

        <div className={cx("col-4")}>
          <label for="money-by-VNJN" className={cx("money-by-VNJN")}>
            Quỹ VIETNAM JOURNEY tài trợ:{" "}
          </label>
          <input
            type="number"
            id="money-by-VNJN"
            name="money-by-VNJN"
            className={cx("input-money-by-VNJN")}
          />
        </div>
      </div>

      <hr />
      <div className={cx("title")}>Thông tin chi tiết </div>
      <div className={cx("row")}>
        <div className={cx("col-4")}>
          <label for="timeline" className={cx("timeline")}>
            Thông tin các mốc thời gian:{" "}
          </label>
          <div className={cx("time")}>
            <label className={cx("inner-title")}>Giai đoạn ban đầu</label>
            <input className={cx("desc")}></input>
            <label className={cx("inner-title")}>Bắt đầu dự án</label>
            <input className={cx("desc")}></input>
            <label className={cx("inner-title")}>Kết thúc dự án</label>
            <input className={cx("desc")}></input>
            <label className={cx("inner-title")}>Tổng kết dự án</label>
            <input className={cx("desc")}></input>
          </div>
        </div>

        <div className={cx("col-4")}>
          <label for="location" className={cx("location")}>
            Thông tin chi tiết về địa điểm:{" "}
          </label>
          <textarea
            type="text"
            id="location"
            name="location"
            className={cx("input-location")}
          />
        </div>
      </div>

      <div className={cx("row")}>
        <div className={cx("col-6")}>
          <hr />
          <div className={cx("title")}>Thông tin liên hệ</div>
          <button className={cx("contact")} onClick={handleAddContactClick}>
            Thêm thông tin liên hệ
          </button>

          {contacts.map((contact, index) => (
            <div key={index} className={cx("form")}>
            <div className={cx("form-group")}>
                <input
                  type="text"
                  id={index}
                  value={contact.organizationName}
                  onChange={(e) => handleNameChange(index, e)}
                  className={cx("form-control")}
                  placeholder="Mô tả"
                />
              </div>
              <div className={cx("form-group")}>
                <input
                  type="text"
                  id={`organizationName-${index}`}
                  value={contact.organizationName}
                  onChange={(e) => handleNameChange(index, e)}
                  className={cx("form-control")}
                  placeholder="Tên đại diện"
                />
              </div>
              <div className={cx("form-group")}>
                <input
                  type="email"
                  id={`contactEmail-${index}`}
                  value={contact.contactEmail}
                  onChange={(e) => handleEmailChange(index, e)}
                  className={cx("form-control")}
                  placeholder="Email"
                />
              </div>
            </div>
          ))}
        </div>

        <div className={cx("col-6")}>
      <hr />
      <div className={cx("title")}>Các tổ chức hỗ trợ thực hiện</div>
      <button className={cx("contact-orgnazation")} onClick={handleAddOrganizationContact}>
        Thêm thông tin liên hệ
      </button>

      {/* Render các ô input cho từng tổ chức */}
      {organizationContacts.map((organization, index) => (
        <div key={index} className={cx("form")}>
        <div className={cx("form-group")}>
            <input
              type="text"
              id={index}
              value={organization.organizationName}
              onChange={(e) => handleOrganizationNameChange(index, e)}
              className={cx("form-control")}
              placeholder="Mô tả"
            />
          </div>
          <div className={cx("form-group")}>
            <input
              type="text"
              id={`organizationName-${index}`}
              value={organization.organizationName}
              onChange={(e) => handleOrganizationNameChange(index, e)}
              className={cx("form-control")}
              placeholder="Tên tổ chức"
            />
          </div>
          <div className={cx("form-group")}>
            <input
              type="email"
              id={`contactEmail-${index}`}
              value={organization.contactEmail}
              onChange={(e) => handleContactEmailChange(index, e)}
              className={cx("form-control")}
              placeholder="Email"
            />
          </div>
        </div>
      ))}
    </div>
      </div>
    </div>
  );
}

export default CreateCampaign;

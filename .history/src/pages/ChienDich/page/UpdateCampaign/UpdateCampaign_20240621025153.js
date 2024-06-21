import classNames from "classnames/bind";
import style from "./UpdateCampaign.module.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import Select from "react-select";

const cx = classNames.bind(style);

function UpdateCampaign() {
  // const { id } = useParams(); // Lấy ID của chiến dịch từ URL
  const location = useLocation();
  const query = queryString.parse(location.search); // Phân tích query string thành object
  const id = query.id; // Lấy giá trị của tham số 'id' từ query string

  const [campaign, setCampaign] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [organizationContacts, setOrganizationContacts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [campaignImageBase64, setCampaignImageBase64] = useState(null);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get("/json_data_vn_units.json");
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces data:", error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await axios.get(
          `http://localhost/bwd/VietNamJourney/Server/ChienDich/getCampaign.php?id=${id}`
        );
        const campaignData = response.data;

        // Tìm tỉnh dựa trên tên tỉnh
        const foundProvince = provinces.find(
          (province) => province.Name === campaignData.province
        );

        // Nếu tìm thấy tỉnh, tìm huyện dựa trên tên huyện
        const foundDistrict = foundProvince
          ? foundProvince.District.find(
              (district) => district.Name === campaignData.district
            )
          : null;

        // Set giá trị ban đầu cho selectedProvince và selectedDistrict
        setSelectedProvince(
          foundProvince
            ? { value: foundProvince.Code, label: foundProvince.Name }
            : null
        );
        setSelectedDistrict(
          foundDistrict
            ? { value: foundDistrict.Code, label: foundDistrict.Name }
            : null
        );

        // Cập nhật danh sách huyện khi có selectedProvince
        if (foundProvince) {
          setDistricts(foundProvince.District);
        }

        // Set các giá trị khác cho campaign
        setCampaign(campaignData);
        setContacts(campaignData.infoContact || []);
        setOrganizationContacts(campaignData.infoOrganization || []);
        // setSelectedImage(campaignData.image);

        setCampaignImageBase64(campaignData.image);
      } catch (error) {
        console.error("Error fetching campaign data:", error);
      }
    };

    if (provinces.length > 0) {
      fetchCampaign();
    }
  }, [id, provinces]);

  useEffect(() => {
    if (selectedProvince) {
      const selectedProvinceData = provinces.find(
        (province) => province.Code === selectedProvince.value
      );
      if (selectedProvinceData) {
        setDistricts(selectedProvinceData.District);
      }
    }
  }, [selectedProvince, provinces]);

  const handleProvinceChange = (selectedOption) => {
    setSelectedProvince(selectedOption);
    setSelectedDistrict(null);
  };

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
  };

  const handleAddContactClick = () => {
    setContacts([...contacts, { organizationName: "", contactEmail: "" }]);
  };

  const handleNameChange = (index, e) => {
    const newContacts = [...contacts];
    newContacts[index].organizationName = e.target.value;
    setContacts(newContacts);
  };

  const handleEmailChange = (index, e) => {
    const newContacts = [...contacts];
    newContacts[index].contactEmail = e.target.value;
    setContacts(newContacts);
  };

  const handleAddOrganizationContact = () => {
    setOrganizationContacts([
      ...organizationContacts,
      { organizationName: "", contactEmail: "" },
    ]);
  };

  const handleOrganizationNameChange = (index, e) => {
    const updatedOrganizationContacts = [...organizationContacts];
    updatedOrganizationContacts[index].organizationName = e.target.value;
    setOrganizationContacts(updatedOrganizationContacts);
  };

  const handleContactEmailChange = (index, e) => {
    const updatedOrganizationContacts = [...organizationContacts];
    updatedOrganizationContacts[index].contactEmail = e.target.value;
    setOrganizationContacts(updatedOrganizationContacts);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
      setImageFile(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const timelineArray = [
      {
        title: "Giai đoạn ban đầu",
        value: event.target.elements.timelineGiaiDoanBanDau.value,
      },
      {
        title: "Bắt đầu dự án",
        value: event.target.elements.timelineBatDauDuAn.value,
      },
      {
        title: "Kết thúc dự án",
        value: event.target.elements.timelineKetThucDuAn.value,
      },
      {
        title: "Tổng kết dự án",
        value: event.target.elements.timelineTongKetDuAn.value,
      },
    ];

    const imageData = imageFile
      ? await convertImageToBase64(imageFile)
      : campaign.image;

    const data = {
      id,
      name: event.target.elements.name.value,
      description: event.target.elements.desc.value,
      dateStart: event.target.elements.dateStart.value,
      dateEnd: event.target.elements.dateEnd.value,
      totalMoney: event.target.elements.totalMoney.value,
      moneyByVNJN: event.target.elements.moneyByVNJN.value,
      province: selectedProvince ? selectedProvince.label : "",
      district: selectedDistrict ? selectedDistrict.label : "",
      location: event.target.elements.location.value,
      timeline: timelineArray,
      infoContact: contacts,
      infoOrganization: organizationContacts,
      image: imageData,
      status: "active",
    };

    console.log("Update Data:", data);

    try {
      const response = await axios.put(
        `http://localhost/bwd/VietNamJourney/Server/ChienDich/updateCampaign.php`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API Response:", response.data);
      if (response.data.success) {
        alert("Cập nhật chiến dịch thành công!");
        // Redirect or perform other actions after successful update
      } else {
        alert("Lỗi: " + response.data.error);
      }
    } catch (error) {
      console.error("Error updating campaign:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  const convertImageToBase64 = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(imageFile);
    });
  };

  if (!campaign) {
    return <div>Loading...</div>;
  }

  return (
    <div className={cx("UpdateCampaign")}>
      <h1>Cập nhật chiến dịch</h1>

      <form onSubmit={handleSubmit}>
        <hr />
        <div className={cx("title")}>Thông tin tổng quan </div>
        <div className={cx("row")}>
          <div className={cx("col-2")}>
            <label htmlFor="name" className={cx("name")}>
              Tên chiến dịch:{" "}
            </label>
          </div>
          <div className={cx("col-10")}>
            <textarea
              type="text"
              id="name"
              name="name"
              className={cx("input-name")}
              defaultValue={campaign.name}
              required
            />
          </div>
        </div>
        <div className={cx("row")}>
          <div className={cx("col-2")}>
            <label htmlFor="desc" className={cx("desc")}>
              Mô tả chiến dịch:{" "}
            </label>
          </div>
          <div className={cx("col-10")}>
            <textarea
              type="text"
              id="desc"
              name="desc"
              className={cx("input-desc")}
              defaultValue={campaign.description}
              required
            />
          </div>
        </div>
        <div className={cx("row")}>
          <div className={cx("col-4", "date")}>
            <label htmlFor="dateStart" className={cx("dateStart")}>
              Ngày bắt đầu:{" "}
            </label>
            <input
              type="date"
              id="dateStart"
              name="dateStart"
              className={cx("input-dateStart")}
              defaultValue={campaign.dateStart}
              required
            />
          </div>

          <div className={cx("col-4", "date")}>
            <label htmlFor="dateEnd" className={cx("dateEnd")}>
              Ngày kết thúc:{" "}
            </label>
            <input
              type="date"
              id="dateEnd"
              name="dateEnd"
              className={cx("input-dateEnd")}
              defaultValue={campaign.dateEnd}
              required
            />
          </div>
        </div>

        <div className={cx("where")}>
          <label htmlFor="province" className={cx("province")}>
            Tỉnh/thành phố:
          </label>
          <div className={cx("input-province")}>
            <Select
              id="province"
              options={provinces.map((province) => ({
                value: province.Code,
                label: province.Name,
              }))}
              value={selectedProvince}
              onChange={handleProvinceChange}
              placeholder="Chọn tỉnh/thành phố..."
              required
            />
          </div>

          <label htmlFor="district" className={cx("district")}>
            Huyện/quận:
          </label>
          <div className={cx("input-district")}>
            <Select
              id="district"
              options={districts.map((district) => ({
                value: district.Code,
                label: district.Name,
              }))}
              value={selectedDistrict}
              onChange={handleDistrictChange}
              placeholder="Chọn huyện/quận..."
              isDisabled={!selectedProvince}
              required
            />
          </div>
        </div>

        <div className={cx("money-row")}>
          <div className={cx("money")}>
            <label htmlFor="total-money" className={cx("total-money")}>
              Tổng giá trị dự án:{" "}
            </label>
            <input
              type="number"
              id="total-money"
              name="totalMoney"
              className={cx("input-total-money")}
              defaultValue={campaign.totalMoney}
              required
            />
          </div>

          <div className={cx("money")}>
            <label htmlFor="money-by-VNJN" className={cx("money-by-VNJN")}>
              Quỹ VIETNAM JOURNEY tài trợ:{" "}
            </label>
            <input
              type="number"
              id="money-by-VNJN"
              name="moneyByVNJN"
              className={cx("input-money-by-VNJN")}
              defaultValue={campaign.moneyByVNJN}
              required
            />
          </div>
        </div>

        <hr />
        <div className={cx("title")}>Thông tin chi tiết </div>
        <div className={cx("row")}>
          <div className={cx("col-6", "timeline-row")}>
            <label htmlFor="timeline" className={cx("timeline")}>
              Thông tin các mốc thời gian:{" "}
            </label>
            <div className={cx("time")}>
              <label className={cx("inner-title")}>Giai đoạn ban đầu</label>
              <input
                className={cx("desc")}
                name="timelineGiaiDoanBanDau"
                defaultValue={campaign.timeline?.[0]?.value}
              />
              <label className={cx("inner-title")}>Bắt đầu dự án</label>
              <input
                className={cx("desc")}
                name="timelineBatDauDuAn"
                defaultValue={campaign.timeline?.[1]?.value}
              />
              <label className={cx("inner-title")}>Kết thúc dự án</label>
              <input
                className={cx("desc")}
                name="timelineKetThucDuAn"
                defaultValue={campaign.timeline?.[2]?.value}
              />
              <label className={cx("inner-title")}>Tổng kết dự án</label>
              <input
                className={cx("desc")}
                name="timelineTongKetDuAn"
                defaultValue={campaign.timeline?.[3]?.value}
              />
            </div>
          </div>

          <div className={cx("col-6")}>
            <label htmlFor="location" className={cx("location")}>
              Thông tin chi tiết về địa điểm:{" "}
            </label>
            <textarea
              type="text"
              id="location"
              name="location"
              className={cx("input-location")}
              defaultValue={campaign.location}
              required
            />
          </div>
        </div>

        <div className={cx("row", "contact-row")}>
          <div className={cx("col-6")}>
            <hr />
            <div className={cx("title")}>Thông tin liên hệ </div>
            <button
              className={cx("contact")}
              type="button"
              onClick={handleAddContactClick}
            >
              Thêm thông tin liên hệ <i class="fa-solid fa-circle-plus"></i>
            </button>

            {contacts.map((contact, index) => (
              <div key={index} className={cx("form", "form-contact")}>
                <input
                  type="text"
                  id={`contactName-${index}`}
                  value={contact.organizationName}
                  onChange={(e) => handleNameChange(index, e)}
                  className={cx("form-control")}
                  placeholder="Tên đại diện"
                  required
                />
                <input
                  type="email"
                  id={`contactEmail-${index}`}
                  value={contact.contactEmail}
                  onChange={(e) => handleEmailChange(index, e)}
                  className={cx("form-control")}
                  placeholder="Email"
                  required
                />
              </div>
            ))}
          </div>

          <div className={cx("col-6")}>
            <hr />
            <div className={cx("title")}>Các tổ chức hỗ trợ thực hiện</div>
            <button
              className={cx("contact-orgnazation")}
              type="button"
              onClick={handleAddOrganizationContact}
            >
              Thêm thông tin liên hệ <i class="fa-solid fa-circle-plus"></i>
            </button>

            {organizationContacts.map((organization, index) => (
              <div key={index} className={cx("form", "form-contact")}>
                <input
                  type="text"
                  id={`organizationName-${index}`}
                  value={organization.organizationName}
                  onChange={(e) => handleOrganizationNameChange(index, e)}
                  className={cx("form-control")}
                  placeholder="Tên tổ chức"
                  required
                />
                <input
                  type="email"
                  id={`organizationEmail-${index}`}
                  value={organization.contactEmail}
                  onChange={(e) => handleContactEmailChange(index, e)}
                  className={cx("form-control")}
                  placeholder="Email"
                  required
                />
              </div>
            ))}
          </div>
        </div>

        <div className={cx("image-upload-container")}>
          <div className={cx("button-container")}>
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              name="image"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="fileInput" className={cx("image-upload-button")}>
              Chọn ảnh
            </label>
          </div>
          {/* {campaignImageBase64 && (
            <div className={cx("image-preview-container")}>
              <img
                src={campaignImageBase64}
                alt="Ảnh đã chọn"
                className={cx("image-preview")}
              />
            </div>
          )}
          {selectedImage && (
            <div className={cx("image-preview-container")}>
              <img
                src={selectedImage}
                alt="Ảnh đã chọn"
                className={cx("image-preview")}
              />
            </div>
          )} */}

          {selectedImage === null ? (
        campaignImageBase64 && (
          <div className={cx("image-preview-container")}>
            <img
              src={`data:image/jpg;base64,${campaignImageBase64}`}
              alt="Ảnh đã chọn"
              className={cx("image-preview")}
            />
          </div>
        )
      ) : (
        <div className={cx("image-preview-container")}>
          <img
            src={selectedImage}
            alt="Ảnh đã chọn"
            className={cx("image-preview")}
          />
        </div>
      )}
        </div>

        <button type="submit" className={cx("submit-button")}>
          Cập nhật chiến dịch
        </button>
      </form>
    </div>
  );
}

export default UpdateCampaign;

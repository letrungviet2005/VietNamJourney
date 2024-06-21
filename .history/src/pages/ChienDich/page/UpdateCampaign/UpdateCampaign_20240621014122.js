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
  const location = useLocation();
  const query = queryString.parse(location.search);
  const id = query.id;

  const [campaign, setCampaign] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [organizationContacts, setOrganizationContacts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

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
        const response = await axios.get(`http://localhost/bwd/VietNamJourney/Server/ChienDich/getCampaign.php?id=${id}`);
        const campaignData = response.data;

        // Tìm tỉnh dựa trên mã tỉnh hoặc tên tỉnh
        const foundProvince = provinces.find(province => province.Code === campaignData.provinceCode || province.Name === campaignData.province);
        // Nếu tìm thấy tỉnh, tìm huyện tương ứng
        const foundDistrict = foundProvince ? foundProvince.District.find(district => district.Code === campaignData.districtCode || district.Name === campaignData.district) : null;

        // Set giá trị ban đầu cho selectedProvince và selectedDistrict
        setSelectedProvince(foundProvince ? { value: foundProvince.Code, label: foundProvince.Name } : null);
        setSelectedDistrict(foundDistrict ? { value: foundDistrict.Code, label: foundDistrict.Name } : null);

        // Cập nhật danh sách huyện khi có selectedProvince
        if (foundProvince) {
          setDistricts(foundProvince.District);
        }

        // Set các giá trị khác cho campaign
        setCampaign(campaignData);
        setContacts(campaignData.infoContact || []);
        setOrganizationContacts(campaignData.infoOrganization || []);
        setSelectedImage(campaignData.image);
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
    setDistricts([]); // Clear districts when province changes
  };

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
  };

  const handleAddContactClick = () => {
    setContacts([...contacts, { organiz

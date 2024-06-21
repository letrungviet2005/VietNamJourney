import classNames from "classnames/bind";
import style from './CreateCampaign.module.scss';
import { useEffect, useState } from "react";

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
        const response = await axios.get('data/vietnam_provinces.json');
        setProvinces(response.data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu JSON:', error);
      }
    };

    fetchData();
  }, []);

  const handleProvinceChange = selectedOption => {
    setSelectedProvince(selectedOption);
    // Find districts for selected province
    const selectedProvinceData = provinces.find(province => province.Code === selectedOption.value);
    if (selectedProvinceData) {
      setDistricts(selectedProvinceData.District);
      setSelectedDistrict(null); // Reset selected district when province changes
    }
  };

  const handleDistrictChange = selectedOption => {
    setSelectedDistrict(selectedOption);
  };

  
  return (  
    <div className={cx('CreateCampaign')}>
      <div className={cx('row')}>
        <div className={cx('col-2')}>
          <label for="name" className={cx('name')}>Tên chiến dịch</label>
        </div>
        <div className={cx('col-10')}>
          <textarea type="text" id="name" name="name" className={cx('input-name')} />
        </div>
      </div>
      <div className={cx('row')}>
        <div className={cx('col-2')}>
          <label for="desc" className={cx('desc')}>Mô tả chiến dịch</label>
        </div>
        <div className={cx('col-10')}>
          <textarea type="text" id="desc" name="desc" className={cx('input-desc')} />
        </div>
      </div>
      <div className={cx('row')}>
        <div className={cx('col-4')}>
          <label for="dateStart" className={cx('dateStart')}>Ngày bắt đầu</label>
          <input type="date" id="dateStart" name="dateStart" className={cx('input-dateStart')} />
        </div>

        <div className={cx('col-4')}>
          <label for="dateEnd" className={cx('dateEnd')}>Ngày kết thúc</label>
          <input type="date" id="dateEnd" name="dateEnd" className={cx('input-dateEnd')} />
        </div>
      </div>
      <form className={cx('form')}>
        <div className={cx('form-group')}>
          <label htmlFor="province" className={cx('label')}>Chọn tỉnh</label>
          <select
            id="province"
            name="province"
            className={cx('input-select')}
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
          >
            <option value="">-- Chọn tỉnh --</option>
            {provinces.map((province) => (
              <option key={province.code} value={province.code}>{province.name}</option>
            ))}
          </select>
        </div>

        <div className={cx('form-group')}>
          <label htmlFor="district" className={cx('label')}>Chọn quận/huyện</label>
          <select
            id="district"
            name="district"
            className={cx('input-select')}
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            disabled={!selectedProvince}
          >
            <option value="">-- Chọn quận/huyện --</option>
            {districts.map((district) => (
              <option key={district.code} value={district.code}>{district.name}</option>
            ))}
          </select>
        </div>
      </form>


    </div>
  );
}

export default CreateCampaign;
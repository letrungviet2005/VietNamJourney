import classNames from "classnames/bind";
import style from './CreateCampaign.module.scss';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Select from 'react-select';


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
        const response = await axios.get('./json_data_vn_units.json');
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
          <label for="dateStart" className={cx('dateStart')}>Ngày bắt đầu: </label>
          <input type="date" id="dateStart" name="dateStart" className={cx('input-dateStart')} />
        </div>

        <div className={cx('col-4')}>
          <label for="dateEnd" className={cx('dateEnd')}>Ngày kết thúc</label>
          <input type="date" id="dateEnd" name="dateEnd" className={cx('input-dateEnd')} />
        </div>
      </div>
      
      <form>
        <label htmlFor="province">Tỉnh/thành phố:</label>
        <Select
          id="province"
          options={provinces.map(province => ({ value: province.Code, label: province.Name }))}
          value={selectedProvince}
          onChange={handleProvinceChange}
          placeholder="Chọn tỉnh/thành phố..."
        />

        <br /><br />

        <label htmlFor="district">Huyện/quận:</label>
        <Select
          id="district"
          options={districts.map(district => ({ value: district.Code, label: district.Name }))}
          value={selectedDistrict}
          onChange={handleDistrictChange}
          placeholder="Chọn huyện/quận..."
          isDisabled={!selectedProvince} // Disable district select until province is selected
        />
      </form>

      <div className={cx('row')}>
        <div className={cx('col-4')}>
          <label for="total-money" className={cx('total-money')}>Tổng giá trị dự án: </label>
          <input type="number" id="total-money" name="total-money" className={cx('input-total-money')} />
        </div>

        <div className={cx('col-4')}>
          <label for="money-by-VNJN" className={cx('money-by-VNJN')}>Quỹ VIETNAM JOURNEY tài trợ: </label>
          <input type="number" id="money-by-VNJN" name="money-by-VNJN" className={cx('input-money-by-VNJN')} />
        </div>
      </div>



    </div>
  );
}

export default CreateCampaign;
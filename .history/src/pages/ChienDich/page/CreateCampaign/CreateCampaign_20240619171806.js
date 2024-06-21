import classNames from "classnames/bind";
import style from './CreateCampaign.module.scss';

const cx = classNames.bind(style);

function CreateCampaign() {
  // State để lưu trữ danh sách các tỉnh và quận/huyện
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  // Fetch danh sách các tỉnh khi component được render
  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/p/')
      .then(response => response.json())
      .then(data => {
        setProvinces(data);
      })
      .catch(error => console.error('Error fetching provinces:', error));
  }, []);

  // Khi một tỉnh được chọn, fetch danh sách các quận/huyện thuộc tỉnh đó
  useEffect(() => {
    if (selectedProvince) {
      fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
        .then(response => response.json())
        .then(data => {
          setDistricts(data.districts);
        })
        .catch(error => console.error('Error fetching districts:', error));
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);

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
      <div className={cx('row')}>
        <div className={cx('col-4')}>
          <label for="province" className={cx('province')}>Ngày bắt đầu</label>
          <input type="date" id="province" name="province" className={cx('input-province')} />
        </div>

        <div className={cx('col-4')}>
          <label for="dateEnd" className={cx('dateEnd')}>Ngày kết thúc</label>
          <input type="date" id="dateEnd" name="dateEnd" className={cx('input-dateEnd')} />
        </div>
      </div>


    </div>
  );
}

export default CreateCampaign;
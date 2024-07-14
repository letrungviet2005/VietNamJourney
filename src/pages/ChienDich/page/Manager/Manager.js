import classNames from "classnames/bind";
import style from './Manager.module.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { getCookie, useCheckCookie } from "../../../../Cookie/getCookie";
import { Spin } from 'antd';

const cx = classNames.bind(style);

function Manager() {
  // State để lưu trữ dữ liệu từ API
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const userId = getCookie('User_ID');
  console.log("user ", userId);

  // Gọi API khi component được render
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`http://localhost:8000/api/managerCampaign/${userId}`);

        if (response.data.list) {
          setData(response.data.list);
          setLoading(false);
        } else {
          throw new Error(response.data.error || 'Unknown error');
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Xử lý trạng thái tải dữ liệu
  if (loading) {
    return (
      <div className={cx('centeredSpin')}>
        <Spin size="large" />
      </div>
    );
  }

  // Xử lý lỗi
  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleRowClick = (id) => {
    navigate('/ManagerDetail/?id=' + id);
  };

  const handleEditClick = (e, id) => {
    e.stopPropagation(); // Ngăn chặn sự kiện nổi bọt
    navigate('/UpdateCampaign' + '?id=' + id);
  };

  const handleAddCampaign = () => {
    navigate('/CreateCampaign');
  };

  return (
    <div className={cx('Manager')}>
      <div className={cx('container')}>
        <hr/>
        <div className={cx('row-title')}>
          <h2 className={cx('title')}>Danh sách chiến dịch</h2>
          <button className={cx('add-button')}   onClick={() => handleAddCampaign()}>Tạo chiến dịch</button>
        </div>
        <table className={cx('table')}>
          <thead>
            <tr>
              <th className={cx('id')}>Mã chiến dịch</th>
              <th className={cx('name')}>Tên chiến dịch</th>
              <th className={cx('province')}>Tỉnh/Thành phố</th>
              <th className={cx('district')}>Quận/Huyện</th>
              <th className={cx('joined')}>TNV tham gia</th>
              <th className={cx('pending')}>TNV chờ duyệt</th>
              <th className={cx('status')}>Tình trạng</th>
              <th className={cx('edit')}>Chỉnh sửa</th>
            </tr>
          </thead>
          <tbody>
            {data.map(campaign => (
              <tr key={campaign.id} onClick={() => handleRowClick(campaign.id)}>
                <td className={cx('id')}>FP{campaign.id}</td>
                <td className={cx('name')}>{campaign.name}</td>
                <td className={cx('province')}>{campaign.province}</td>
                <td className={cx('district')}>{campaign.district}</td>
                <td className={cx('joined')}>{campaign.joined}</td>
                <td className={cx('pending')}>{campaign.pending}</td>
                <td className={cx('status')}>
                  <button className={cx({
                    'dang-dien-ra': campaign.status === 'đang diễn ra',
                    'sap-dien-ra': campaign.status === 'sắp diễn ra',
                    'da-ket-thuc': campaign.status === 'đã kết thúc'
                  }, 'status')}>
                    {campaign.status}
                  </button>
                </td>
                <td className={cx('edit')}>
                  <button className={cx('edit')} onClick={(e) => handleEditClick(e, campaign.id)}>
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Manager;

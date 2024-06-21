import classNames from "classnames/bind";
import style from './Manager.module.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { getCookie, useCheckCookie } from "../../../../Cookie/getCookie";

const cx = classNames.bind(style);

function Manager() {
  // State để lưu trữ dữ liệu từ API
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const userId = { userId: getCookie('User_ID') };

  // Gọi API khi component được render
  useEffect(() => {
    fetch('http://localhost/bwd/VietNamJourney/Server/ChienDich/ListCampaign.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userId) // Nếu cần gửi dữ liệu cụ thể trong yêu cầu POST
    })
      .then(response => response.json())
      .then(data => {
        if (data.list) {
          setData(data.list);
          setLoading(false);
        } else {
          throw new Error(data.error || 'Unknown error');
        }
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Xử lý trạng thái tải dữ liệu
  if (loading) {
    return <div>Loading...</div>;
  }

  // Xử lý lỗi
  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleRowClick = (id) => {
    navigate('/UpdateCampaign' + '?id=' + id);
  };

  const handleAddCampaign = (id) => {
    navigate('/');
  };

  return (
    <div className={cx('Manager')}>
      <div className={cx('container')}>
        <hr/>
        <div className={cx('row-title')}>
          <h2 className={cx('title')}>Danh sách chiến dịch</h2>
          <button className={cx('add-button')}>Tạo chiến dịch</button>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Manager;

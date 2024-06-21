import classNames from "classnames/bind";
import style from './Manager.module.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const cx = classNames.bind(style);

function Manager() {
  // State để lưu trữ dữ liệu từ API
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Gọi API khi component được render
  useEffect(() => {
    fetch('http://localhost/bwd/VietNamJourney/Server/ChienDich/ListCampaign.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) // Nếu cần gửi dữ liệu cụ thể trong yêu cầu POST
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
    axios.post('http://localhost/bwd/VietNamJourney/Server/ChienDich/updatecampaign.php', {
      id: id,
    })
    .then((response) => {
      // Xử lý phản hồi từ server nếu cần
      console.log('Phản hồi từ server:', response.data);
      // Sau khi xử lý xong, chuyển hướng đến trang /UpdateCampaign với query parameter id
      navigate(`/UpdateCampaign?id=${id}`);
    })
    .catch((error) => {
      if (error.response) {
        // Server trả về mã lỗi và thông báo lỗi
        console.log('Server response:', error.response.data);
        console.log('Status code:', error.response.status);
        console.log('Status text:', error.response.statusText);
      } else if (error.request) {
        // Yêu cầu được gửi đi nhưng không nhận được phản hồi
        console.error('No response received:', error.request);
      } else {
        // Lỗi xảy ra khi thiết lập yêu cầu
        console.error('Error setting up the request:', error.message);
      }
    });
  };

  // Render bảng dữ liệu
  return (
    <div className={cx('Manager')}>
      <div className={cx('container')}>
        <hr/>
        <h2 className={cx('title')}>Danh sách chiến dịch</h2>
        <table className={cx('table')}>
          <thead>
            <tr>
              <th>Mã chiến dịch</th>
              <th>Tên chiến dịch</th>
              <th>Tỉnh</th>
              <th>Quận/Huyện</th>
              <th>TNV tham gia</th>
              <th>TNV chờ duyệt</th>
              <th>Tình trạng</th>
            </tr>
          </thead>
          <tbody>
            {data.map(campaign => (
              <tr key={campaign.id} onClick={() => handleRowClick(campaign.id)}>
                <td>{campaign.id}</td>
                <td>{campaign.name}</td>
                <td>{campaign.province}</td>
                <td>{campaign.district}</td>
                <td>{campaign.joined}</td>
                <td>{campaign.pending}</td>
                <td>{campaign.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default Manager;

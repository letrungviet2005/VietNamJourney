import classNames from "classnames/bind";
import style from './Manager.module.scss';
import { useState, useEffect } from 'react';

const cx = classNames.bind(style);

function Manager() {
  // State để lưu trữ dữ liệu từ API
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              <th className={cx('center')}>TNV tham gia</th>
              <th>TNV chờ duyệt</th>
              <th>Tình trạng</th>
            </tr>
          </thead>
          <tbody>
            {data.map(campaign => (
              <tr key={campaign.id}>
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

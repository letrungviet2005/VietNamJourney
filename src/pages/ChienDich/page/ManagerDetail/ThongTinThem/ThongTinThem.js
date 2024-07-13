import classNames from "classnames/bind";
import style from "./ThongTinThem.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";

const cx = classNames.bind(style);

function ThongTinThem({ campaign }) {
  const [volunteers, setVolunteers] = useState([]);
  const [pending, setPending] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const fetchVolunteers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/getJoined/${campaign.id}`
      );
      setVolunteers(response.data.volunteers);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
    }
  };

  const fetchPending = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/getPending/${campaign.id}`
      );
      setPending(response.data.pending);
    } catch (error) {
      console.error("Error fetching Pending:", error);
    }
  };

  useEffect(() => {
    fetchVolunteers();
    fetchPending();
  }, [campaign.id]);

  // Thêm class 'scrollable' cho bảng nếu có nhiều hơn 10 dòng
  useEffect(() => {
    const tables = document.querySelectorAll(".table-scrollable");

    tables.forEach((table) => {
      if (table.clientHeight < table.scrollHeight) {
        table.classList.add("scrollable");
      } else {
        table.classList.remove("scrollable");
      }
    });
  }, [volunteers, pending]);

  const updateStatus = async (campaignId, userId, status) => {
    try {
      const response = await axios.post('http://localhost:8000/api/updateStatus', {
        campaignId: campaignId,
        userId: userId,
        status: status
      });
      console.log('Update status response:', response.data);

      // Sau khi cập nhật thành công, gọi lại fetchVolunteers và fetchPending để lấy lại dữ liệu mới
      fetchVolunteers();
      fetchPending();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const viewProfile = async (volunteer) => {
    try {
      setSelectedUser(volunteer);
      setShowProfileModal(true);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const closeModal = () => {
    setShowProfileModal(false);
  };

  return (
    <div className={cx("ThongTinThem")}>
      <div className={cx("joined")}>
        <hr />
        <div className={cx("title")}>Thành viên</div>
        <div className={cx("info")}>
          <table className={cx("table", "table-striped", "fixed-height-table")}>
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Thành viên</th>
                <th scope="col" style={{ width: "100px" }}></th>
              </tr>
            </thead>
            <tbody>
            {volunteers && volunteers.length > 0 && volunteers.map((volunteer, index) => (
              <tr key={volunteer.id}>
                <th scope="row" className={cx("number")}>{index + 1}</th>
                <td>
                  <div className={cx("person")}>
                    <img
                      src={`http://localhost:8000/${volunteer.user_infomation.Image}`}
                      alt="Avatar"
                    />
                    <div className={cx("info")}>
                      <div className={cx("fullname")}>
                        {volunteer.user_infomation.Name}
                      </div>
                      <div className={cx("username")}>
                        {volunteer.user_infomation.Username}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <button
                  onClick={() => viewProfile(volunteer)}
                    className={cx("btn btn-outline-secondary")}
                    >
                    <i class="fa-solid fa-eye"></i>
                  </button>
                </td>
              </tr>
            ))}

            
            </tbody>
          </table>
        </div>
      </div>
      <div className={cx("pending")}>
        <hr />
        <div className={cx("title")}>Đang chờ duyệt</div>
        <div className={cx("info")}>
          <table className={cx("table", "table-striped", "fixed-height-table")}>
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Thành viên</th>
                <th scope="col"></th>
                <th scope="col">Duyệt</th>
                <th scope="col">Xóa</th>
              </tr>
            </thead>
            <tbody>
            {pending && pending.length > 0 && pending.map((volunteer, index) => (
              <tr key={volunteer.id}>
                <th scope="row" className={cx("number")}>{index + 1}</th>
                <td>
                  <div className={cx("person")}>
                    <img
                      src={`http://localhost:8000/${volunteer.user_infomation.Image}`}
                      alt="Avatar"
                    />
                    <div className={cx("info")}>
                      <div className={cx("fullname")}>
                        {volunteer.user_infomation.Name}
                      </div>
                      <div className={cx("username")}>
                        {volunteer.user_infomation.Username}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => viewProfile(volunteer)}
                    className={cx("btn btn-outline-secondary")}
                    >
                    <i class="fa-solid fa-eye"></i>
                  </button>
                </td>
                <td>
                  <div className={cx("duyet")}>
                    <button className={cx("btn btn-success")} onClick={() => updateStatus(campaign.id, volunteer.userId, 2)}>Duyệt</button>
                  </div>
                </td>
                <td>
                  <div className={cx("xoa")}>
                    <button className={cx("btn btn-danger")} onClick={() => updateStatus(campaign.id, volunteer.userId, 0)}><i class="fa-solid fa-trash"></i></button>
                  </div>
                </td>
                
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
          isOpen={showProfileModal}
          onRequestClose={closeModal}
          contentLabel="User Profile"
          className={cx("modal")}
          overlayClassName={cx("overlay")}
        >
          <div className={cx("profile")}>
            {selectedUser ? (
              <div className={cx("content")}>
                <div className={cx("top")}>
                  <img src={`http://localhost:8000/${selectedUser.user_infomation.Image}`} alt="Avatar" />
                  <div className={cx("person")}>
                    <div className={cx("name")}>{selectedUser.user_infomation.Name}</div>
                    <div className={cx("username")}>@{selectedUser.user_infomation.Username}</div>
                  </div>
                </div>
                <div className={cx("info")}>
                  <div className="row">
                    <div className="col-6">
                      <label>Họ và tên</label>
                      <div className={cx("fullname")}>{selectedUser.form_volunteer.info_form_volunteer.fullname}</div>
                    </div>
                    <div className="col-6">
                      <label>Ngày sinh</label>
                      <div className={cx("birth")}>{selectedUser.form_volunteer.info_form_volunteer.birth}</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label>Số điện thoại</label>
                      <div className={cx("phone")}>{selectedUser.form_volunteer.info_form_volunteer.phone}</div>
                    </div>
                    <div className="col-6">
                      <label>Email</label>
                      <div className={cx("email")}>{selectedUser.user_infomation.Email}</div>
                    </div>
                    <label>Địa chỉ</label>
                    <div className={cx("address")}>{selectedUser.form_volunteer.info_form_volunteer.address}</div>
                  </div>
                </div>
                  <div className={cx("reason-row")}>
                    <label>Lý do muốn tham gia chiến dịch</label>
                    <div className={cx("reason")}>{selectedUser.form_volunteer.reason}</div>
                  </div>
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </div>
      </Modal>
    </div>
  );
}

export default ThongTinThem;

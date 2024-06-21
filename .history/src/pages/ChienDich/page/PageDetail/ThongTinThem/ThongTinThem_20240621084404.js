import classNames from "classnames/bind";
import style from "./ThongTinThem.module.scss";

const cx = classNames.bind(style);

function ThongTinThem({ campaign }) {
  console.log(campaign.infoContact);
  return (
    <div className={cx("ThongTinThem")}>
      <div className={cx("contact")}>
        <hr />
        <div className={cx("title")}>Liên hệ </div>
        <div className={cx("info")}>
          {campaign.infoContact.map((contact, index) => (
            <div key={index} className={cx("item")}>
              <p className={cx("title")}>{contact.organizationName}</p>
              <p className={cx("email")}>
                <i className="fa-solid fa-envelope"></i> {contact.contactEmail}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className={cx("organizations")}>
        <hr />
        <div className={cx("title")}>Các tổ chức hỗ trợ thực hiện</div>
        <div className={cx("info")}>
          {campaign.infoOrganization.map((contact, index) => (
            <div key={index} className={cx("item")}>
              <p className={cx("title")}>{contact.organizationName}</p>
              <p className={cx("email")}>
                <i className="fa-solid fa-envelope"></i> {contact.contactEmail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThongTinThem;

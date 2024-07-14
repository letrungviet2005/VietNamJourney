import classNames from "classnames/bind";
import style from "./New3.module.scss";
import Footer from "../../../../component/Footer/Footer.js";

import anh1 from "../../../../Images/TrangChu/News/New3/anh1.png";

const cx = classNames.bind(style);

function CoNew3() {
  const myStyle = {
    backgroundImage: `url(${anh1})`, // Sử dụng dữ liệu hình ảnh từ API
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu đen trong suốt với độ mờ 50%
    backgroundBlendMode: "multiply", // Áp dụng chế độ kết hợp 'multiply' để làm cho ảnh nền bị tối đi
  };

  return (
    <div className={cx("New")}>
      <div className={cx("header")} style={myStyle}>
        <p className={cx("desc")}>
          Giải chạy "Vì môi trường xanh" tại thành phố Đà Nẵng
        </p>
      </div>

      <div className={cx("TongQuan")}>
        <div className={cx("left")}>
          <hr />
          <div className={cx("inner")}>
            <p className={cx("title")}>LĨNH VỰC</p>
            <p className={cx("time")}>Thể thao</p>{" "}
            {/* Hiển thị status từ API nếu có */}
          </div>
          <div className={cx("inner")}>
            <p className={cx("title")}>NGÀY ĐĂNG</p>
            <p className={cx("time")}>14/07/2024</p>
          </div>
        </div>
        <div className={cx("right")}>
          <pre className={cx("description")}>
            <p>
              Phát biểu tại Lễ Phát động, ông Nguyễn Hoàng Việt- Phó Chủ tịch
              UBND quận Sơn Trà đề nghị các cấp, ngành, hội, đoàn thể, cơ quan,
              đơn vị, địa phương tăng cường hơn nữa công tác tuyên truyền, giáo
              dục nhằm tạo sự lan tỏa trong toàn xã hội về các hành động bảo vệ
              môi trường, đa dạng sinh học, các hệ sinh thái trên cạn và dưới
              nước; nhất là các hoạt động giáo dục về bảo vệ môi trường, yêu
              thiên nhiên, bảo tồn đa dạng sinh học cho học sinh tại các trường
              học trên địa bàn.
            </p>

            <p>
              Cùng đó, các đơn vị cần tổ chức tốt các hoạt động, sự kiện thu gom
              rác tái chế, đồng loạt ra quân hưởng ứng phong trào ngày Chủ nhật
              xanh, sạch, đẹp, xây dựng các mô hình phân loại rác tại nguồn và
              giảm thiểu rác thải nhựa hiệu quả tại các khu dân cư, ra quân nạo
              vét, khơi thông cống rãnh, mương thoát nước… Bên cạnh đó, khuyến
              khích các doanh nghiệp, các cơ sở kinh doanh dịch vụ đầu tư, sản
              xuất, sử dụng các vật liệu thân thiện với môi trường.
            </p>

            <p>
              Đối với các phòng ban nghiệp vụ liên quan, ông Nguyễn Hoàng Việt
              yêu cầu triển khai có hiệu quả các chính sách phù hợp để hạn chế
              rác thải nhựa đại dương, bảo tồn đa dạng sinh học, xử lý tốt các
              nguồn gây ô nhiễm môi trường biển từ đất liền, giảm rác thải nhựa,
              hạn chế sử dụng túi ni-lông; đặc biệt là phát hiện và biểu dương
              những tấm gương, mô hình, cách làm hiệu quả…
            </p>

            <p>
              Dịp này, lãnh đạo UBND quận Sơn Trà tặng Giấy khen cho các tập
              thể, cá nhân đạt giải trong cuộc thi vẽ tranh về bảo vệ môi trường
              và đa dạng sinh học. Ngay sau lễ phát động, UBND quận tổ chức
              triển lãm tranh, ảnh, sản phẩm tái chế tuyên truyền bảo vệ môi
              trường và đa dạng sinh học; phát động đạp xe, chạy bộ kêu gọi bảo
              vệ môi trường. Cùng với đó, các phường trên địa bàn quận đã tổ
              chức ra quân tổng dọn vệ sinh môi trường, thu gom rác thải tại các
              khu vực dân cư, bãi biển, thu gom rác tái chế tại các hộ gia đình…
            </p>

            <p>
              Được biết, UBND quận Sơn Trà phối hợp với Công ty Cổ phần Môi
              trường đô thị Đà Nẵng tổ chức thu mua các sản phẩm tái chế sau
              phân loại rác tại nguồn, tuyên truyền, kêu gọi người dân trên địa
              bàn quận cài đặt ứng dụng (app) CORE trên điện thoại thông minh
              hoặc gọi số điện thoại 02367779900 để liên hệ chuyển giao rác có
              khả năng tái chế, tái sử dụng sau phân loại rác tại nguồn và tích
              lũy điểm hoặc nhận lại quà, tiền mặt…
            </p>

            <p>
              Cùng ngày, các tổ chức cơ sở Đoàn trong Bộ đội Biên phòng (BĐBP)
              TP Đà phối hợp với các hội, đoàn thể địa phương, các đơn vị liên
              kết, kết nghĩa đồng loạt ra quân thực hiện “Ngày Chủ nhật xanh”
              lần II năm 2024 với các hoạt động thiết thực, tình nguyện vì cuộc
              sống cộng đồng như: ra quân thực hiện chương trình “Hãy làm sạch
              biển” thu gom, phân loại rác thải; tổ chức vệ sinh xung quanh cơ
              quan, đơn vị, các tuyến đường dân sinh trên địa bàn khu vực đóng
              quân… Hoạt động thu hút hơn 100 đoàn viên thanh niên tham gia.
              Thông qua hoạt động nhằm giảm thiểu tác động tiêu cực của ô nhiễm
              rác thải, bảo vệ môi trường và ứng phó với biến đổi khí hậu; đồng
              thời giúp tuyên truyền, nâng cao ý thức bảo vệ môi trường sống
              xanh, phát huy tinh thần xung kích, tình nguyện của đoàn viên,
              thanh niên trong tham gia bảo vệ môi trường, tạo hiệu ứng tích cực
              và lan tỏa đến với người dân.
            </p>
          </pre>
        </div>
        <div className={cx("info")}>
          <hr />
          <div className={cx("inner")}>
            <p className={cx("title")}>LIÊN HỆ</p>
            <p className={cx("time")}>
              <i className="fa-solid fa-envelope"></i> vnjn2005@gmail.com
            </p>{" "}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CoNew3;

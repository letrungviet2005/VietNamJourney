import classNames from "classnames/bind";
import style from "./New1.module.scss";
import Footer from "../../../../component/Footer/Footer.js";

import anh1 from "../../../../Images/TrangChu/News/New1/anh1.png";

const cx = classNames.bind(style);

function CoNew1() {
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
          Việt Nam quyết tâm với cam kết đạt phát thải ròng bằng 0 vào 2050
        </p>
      </div>

      <div className={cx("TongQuan")}>
        <div className={cx("left")}>
          <hr />
          <div className={cx("inner")}>
            <p className={cx("title")}>LĨNH VỰC</p>
            <p className={cx("time")}>Chính trị</p>{" "}
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
              Trong khuôn khổ Tuần lễ Cấp cao Đại hội đồng Liên hợp quốc khóa 78
              tại trụ sở Liên hợp quốc ở New York, Hoa Kỳ, sáng ngày 20/9 (giờ
              địa phương), Hội nghị Thượng đỉnh Tham vọng Khí hậu đã khai mạc
              trọng thể, với sự tham dự của đông đảo lãnh đạo cấp cao các nước
              và các tổ chức quốc tế. Thủ tướng Chính phủ Phạm Minh Chính đã dẫn
              đầu Đoàn Việt Nam tham dự Hội nghị.
            </p>

            <p>
              Phát biểu tại Hội nghị, lãnh đạo các nước và tổ chức quốc tế bày
              tỏ lo ngại trước những tác động khốc liệt của biến đổi khí hậu;
              nhấn mạnh ứng phó với biến đổi khí hậu là trách nhiệm chung, cộng
              đồng quốc tế cần khẩn trương hành động, tăng cường hợp tác, đoàn
              kết để giải quyết vấn đề này; kêu gọi giảm dần việc sử dụng nhiên
              liệu hóa thạch, chuyển đổi xanh công bằng, cân bằng tài chính cho
              thích ứng với tài chính cho giảm nhẹ phát thải khí nhà kính, cải
              tổ hệ thống tài chính toàn cầu.
            </p>

            <p>
              Tổng Thư ký Liên hợp quốc kêu gọi các nước đặt ra tham vọng về
              giảm phát thải nhà kính phù hợp với mục tiêu duy trì mức tăng
              nhiệt độ toàn cầu ở 1,5°C, trong đó các nước phát thải nhiều cần
              đi đầu trong giảm phát thải khí nhà kính, các nước phát triển cần
              đạt phát thải ròng bằng “0” muộn nhất vào năm 2040 và các nền kinh
              tế lớn mới nổi là vào năm 2050; nhấn mạnh các nước phát triển cần
              hỗ trợ các nước đang phát triển phù hợp với trách nhiệm chung
              nhưng có phân biệt.
            </p>

            <p>
              Phát biểu tại Hội nghị, Thủ tướng Chính phủ Phạm Minh Chính nhấn
              mạnh biến đổi khí hậu tiếp tục là thách thức toàn cầu lớn nhất,
              tác động trực tiếp và gây tổn thất nặng nề đối với phát triển kinh
              tế, an sinh xã hội và trực tiếp đối với an toàn tính mạng, sức
              khỏe của người dân.
            </p>

            <p>
              Thủ tướng cho rằng, giải quyết biến đổi khí hậu phải có cách tiếp
              cận toàn cầu và toàn dân, với những giải pháp đột phá, tổng thể,
              toàn diện, đổi mới và sáng tạo và kêu gọi cần khẩn trương hơn,
              hành động mạnh mẽ hơn và có trách nhiệm hơn nữa để hạn chế tối đa
              mức tăng nhiệt độ Trái Đất.
            </p>

            <p>
              Thủ tướng Chính phủ đề xuất xác lập tầm nhìn mới, tư duy mới,
              quyết tâm mới, hành động quyết liệt cho phát triển xanh, phát thải
              ròng bằng “0”; đẩy nhanh quá trình chuyển đổi năng lượng xanh công
              bằng và công lý; trong đó lấy người dân làm trung tâm, chủ thể và
              không để ai bị bỏ lại phía sau; kêu gọi các quốc gia phát triển,
              các tổ chức quốc tế tích cực hỗ trợ các nước đang phát triển, các
              nước kém phát triển về công nghệ xanh, tài chính xanh, quản lý
              xanh và đào tạo nguồn nhân lực xanh; xây dựng ngành công nghiệp
              năng lượng tái tạo và các hệ thống truyền tải điện thông minh…
            </p>

            <p>
              Đề xuất xây dựng các mối quan hệ đối tác thế hệ mới, đẩy mạnh huy
              động tài chính xanh cho khí hậu theo hình công - tư, trong đó đầu
              tư công dẫn dắt đầu tư tư, Thủ tướng cho rằng các nước phát triển,
              các đối tác quốc tế cần tăng gấp đôi tài chính cho các hoạt động
              thích ứng vào năm 2025 và đưa Quỹ Tổn thất và Thiệt hại vào hoạt
              động tại COP28 như đã cam kết, để hỗ trợ các nước đang phát triển,
              các nước kém phát triển khắc phục những hậu quả do biến đổi khí
              hậu gây ra, đồng thời cần tiếp tục đổi mới toàn diện hệ thống tài
              chính toàn cầu để tăng khả năng cung cấp tài chính xanh, giúp thế
              giới ứng phó tốt hơn với các thách thức lớn của biến đổi khí hậu.
            </p>

            <p>
              Thủ tướng chia sẻ Việt Nam là một trong 30 nước nộp bản Đóng góp
              do quốc gia tự quyết định (NDC), là một trong ba quốc gia đang
              phát triển đầu tiên tham gia quan hệ đối tác về chuyển đổi năng
              lượng công bằng (JETP) và đang cùng các đối tác quốc tế xây dựng
              Kế hoạch huy động nguồn lực để công bố tại COP28 với mong muốn đưa
              mô hình quan hệ đối tác này trở thành hình mẫu, góp phần thúc đẩy
              xu hướng chuyển đổi năng lượng công bằng trên toàn cầu.
            </p>

            <p>
              Nhân dịp này, Thủ tướng khẳng định Việt Nam quyết tâm thực hiện
              cam kết đạt phát thải ròng bằng “0” vào năm 2050 và với sự đồng
              hành, hỗ trợ đầy đủ của cộng đồng quốc tế, phấn đấu giảm nhanh
              lượng phát thải khí nhà kính đến 43,5% vào năm 2030 và đạt tỷ lệ
              năng lượng tái tạo hơn 70% vào năm 2050.
            </p>
          </pre>
        </div>
        <div className={cx("info")}>
          <hr />
          <div className={cx("inner")}>
            <p className={cx("title")}>LIÊN HỆ</p>
            <p className={cx("time")}><i className="fa-solid fa-envelope"></i> vnjn2005@gmail.com</p>{" "}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CoNew1;

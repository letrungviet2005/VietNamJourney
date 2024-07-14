import classNames from "classnames/bind";
import style from "./New2.module.scss";
import Footer from "../../../../component/Footer/Footer.js";

import anh1 from "../../../../Images/TrangChu/News/New2/anh1.png";

const cx = classNames.bind(style);

function CoNew2() {


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
          Năng lượng xanh - xu hướng toàn cầu năm 2024
        </p>
      </div>

      <div className={cx("TongQuan")}>
        <div className={cx("left")}>
          <hr />
          <div className={cx("inner")}>
            <p className={cx("title")}>LĨNH VỰC</p>
            <p className={cx("time")}>Năng lượng</p>{" "}
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
              Tạp chí Forbes vừa đưa ra danh sách 15 xu hướng toàn cầu nổi bật
              vào năm 2024, bao gồm các xu hướng về chính trị, kinh tế, môi
              trường, công nghệ…
            </p>

            <p>
              Ở góc độ địa chính trị, xu hướng biến động của năm 2024 được xem
              là sẽ đến từ các cuộc bầu cử, bởi đây là thời điểm diễn ra những
              cuộc bầu cử quan trọng ở nhiều nước. Theo các chuyên gia của
              Forbes, bước sang năm 2024, thế giới đang chuẩn bị cho năm bầu cử
              quan trọng nhất trong lịch sử, với 40 cuộc bầu cử quốc gia sắp
              diễn ra. Vòng xoáy địa chính trị này ảnh hưởng tới 41% dân số toàn
              cầu và 42% GDP, tác động tới trật tự toàn cầu. Đặc biệt, ở một số
              quốc gia như Mỹ, Anh, Nam Phi, Indonesia, Ấn Độ, Mexico và Nga,
              các cuộc bầu cử có thể tạo ra những thay đổi lớn.
            </p>

            <p>
              Ở góc độ công nghệ, trí tuệ nhân tạo (AI) đã tạo nên một cuộc cách
              mạng trên toàn cầu trong năm 2023 và sẽ tiếp tục gây ảnh hưởng lớn
              trong năm 2024. Theo Bill Gates, việc chuyển đổi từ “bots” sang
              “agents” sẽ là cuộc cách mạng lớn nhất trong điện toán kể từ khi
              chúng ta chuyển từ gõ lệnh sang nhấn vào biểu tượng, và năm 2024
              có thể là năm thương mại hóa các “agent” cá nhân. “Agent” cá nhân
              là chương trình máy tính thông minh, được ví như các “đặc vụ Jame
              Bond 007 của riêng bạn”, nó có khả năng hiểu ngôn ngữ tự nhiên và
              thực hiện các nhiệm vụ phức tạp mà không cần đến sự can thiệp lớn
              từ người sử dụng.
            </p>

            <p>
              Bên cạnh đó, các xu hướng công nghệ trong lĩnh vực văn phòng được
              xem là sẽ tác động lớn đến bất động sản văn phòng. Chẳng hạn như
              công nghệ Generative AI đang nâng cao cả không gian họp vật lý và
              ảo. Hội nghị truyền hình sẽ phát triển với khả năng phân tích theo
              thời gian thực, tạo ra các phòng họp nhóm và bảng trắng do AI điều
              khiển, biến ghi chú thành nhiệm vụ. Vào năm 2024, các cuộc họp ảo
              sẽ trở thành trải nghiệm phong phú, được hỗ trợ bởi AI, biến các
              phòng họp truyền thống thành không gian linh hoạt. Tuy nhiên, các
              chuyên gia cũng cho rằng, công nghệ này sẽ tác động rõ rệt tới bất
              động sản văn phòng, với dự kiến giá trị văn phòng sẽ giảm 35% vào
              cuối năm 2025 và tỷ lệ trống cao kỷ lục trên toàn cầu. Điều này có
              thể tạo ra một cuộc khủng hoảng tài chính bất động sản thương mại…
            </p>

            <p>
              Đáng chú ý trong các xu hướng toàn cầu 2024, theo dự báo của các
              chuyên gia, là các cột mốc trong lĩnh vực năng lượng xanh sẽ tạo
              ra bước ngoặt cho sự phát triển bền vững.
            </p>

            <p>
              Một thành tựu nổi bật của năm 2023 là sự gia tăng toàn cầu trong
              việc áp dụng năng lượng tái tạo. Năm qua, chúng ta chứng kiến sự
              gia tăng đáng kể trong việc lắp đặt hệ thống năng lượng mặt trời
              và mua xe điện. Giá pin mặt trời, máy bơm nhiệt ở cấp độ công
              nghiệp và hộ gia đình cũng như giá năng lượng gió đều giảm. Điều
              này làm dấy lên hy vọng về việc áp dụng năng lượng sạch mạnh mẽ
              hơn trong năm mới.
            </p>

            <p>
              Trang tin euronews.com cũng đưa ra nhiều dẫn chứng cho thấy tín
              hiệu lạc quan về vấn đề năng lượng xanh và môi trường. Đáng chú ý
              nhất là kết quả khả quan từ Hội nghị thượng đỉnh về khí hậu của
              Liên hợp quốc COP28, diễn ra vào cuối tháng 11-2023 tại Dubai. Đây
              là lần đầu tiên sau ba thập niên tổ chức hội nghị thượng đỉnh về
              khí hậu COP, các quốc gia nhất trí về việc phối hợp giảm sử dụng
              dầu, khí đốt và than đá, vốn chiếm 80% năng lượng toàn cầu. COP28
              cũng kêu gọi tăng gấp ba lần công suất năng lượng tái tạo trên
              toàn cầu vào năm 2030, đẩy nhanh nỗ lực giảm lượng than và tăng
              tốc các công nghệ như thu hồi và lưu trữ carbon.
            </p>

            <p>
              Các hoạt động môi trường cũng đạt được nhiều thành tựu trên toàn
              cầu. Một thông tin tốt lành, theo Forbes, là nạn phá rừng ở rừng
              nhiệt đới Amazon, lá phổi của hành tinh, đã giảm 22% trong năm
              2023. Những nỗ lực hạn chế nạn phá rừng không chỉ giúp bảo vệ sự
              đa dạng sinh học mà còn đóng vai trò quan trọng trong việc giảm
              thiểu biến đổi khí hậu bằng cách bảo tồn các “bể chứa carbon” tự
              nhiên và duy trì cân bằng sinh thái. Các cộng đồng bản địa đã
              giành được quyền bảo vệ 225 nghìn mẫu đất rừng khỏi hoạt động khai
              thác mỏ ở miền Tây nước Mỹ. Cả hai đều mang lại lợi ích đáng kể
              cho khí hậu, vì rừng đóng vai trò quan trọng trong việc hấp thụ
              CO2 và duy trì mức carbon toàn cầu.
            </p>
            <p>
              Với những tín hiệu khả quan kể trên, năm 2024 được coi là thời
              điểm bước ngoặt cho quá trình chuyển đổi toàn cầu sang năng lượng
              sạch, thực hiện các mục tiêu về bảo vệ môi trường. Việc áp dụng
              năng lượng tái tạo ngày càng tăng đóng vai trò là “ngọn hải đăng
              hy vọng”, thể hiện cam kết của thế giới đối với một tương lai bền
              vững. Mặc dù vẫn còn thách thức trong việc đảm bảo quá trình
              chuyển đổi công bằng và hợp lý, nhưng sự tăng trưởng nhanh chóng
              của năng lượng tái tạo cung cấp bằng chứng thuyết phục về một
              tương lai bền vững trong tầm tay.
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

export default CoNew2;

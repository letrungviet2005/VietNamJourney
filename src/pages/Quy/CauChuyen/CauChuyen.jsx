import styles from "./CauChuyen.module.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import arrow from "../../../Images/Quy/CauChuyen/arrow.png";
import ngoac from "../../../Images/Quy/CauChuyen/ngoac.png";
import nguoiphunu from "../../../Images/Quy/CauChuyen/nguoiphunu.png";
import points from "../../../Images/Quy/CauChuyen/points.png";

function CoCauChuyen() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Số lượng slides mặc định hiển thị
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className={styles.main}>
      <div className={styles.div1}>
        <p>Câu chuyện đằng sau những dự án</p>
      </div>

      <div className={styles.slide}>
        <Slider {...settings} className="row">
          <div className="col-12">
              <div className={styles.div2}>
                <div className={styles.div_left}>
                  <img alt=">_<" src={nguoiphunu}></img>
                </div>
      
                <div className={styles.div_right}>
                  <div className={styles.top}>
                    <div className={styles.part1}>
                      <div className={styles.line1}></div>
                      <p>FP076</p>
                    </div>
      
                    <p className={styles.top_p1}>
                      Nghiên cứu phát triển giống lúa mới chống chịu tác động của biến
                      đổi khí hậu và hạn chế sử dụng thuốc bảo vệ thực vật.
                    </p>
                  </div>
      
                  <div className={styles.mid}>
                    <img alt=">_<" src={ngoac}></img>
      
                    <p className={styles.mid_p1}>
                      Chị vừa nhận được giống lúa mới năm nay [2020]. Sau đó đem trồng
                      vào tháng 6 và thu hoạch vào tháng 11. Thực sự rất vui mừng vì
                      sản lượng tăng lên cao đồng thời cũng tiết kiệm chi phí mua
                      thuốc trừ sâu.
                    </p>
      
                    <p className={styles.mid_p2}>
                      Chị Trần Thị Thu Hà<br></br>Nông dân tại tỉnh Thừa Thiên Huế
                    </p>
                  </div>
      
                </div>
              </div>
          </div>
  
          <div className="col-12">
              <div className={styles.div2}>
                <div className={styles.div_left}>
                  <img alt=">_<" src={nguoiphunu}></img>
                </div>
      
                <div className={styles.div_right}>
                  <div className={styles.top}>
                    <div className={styles.part1}>
                      <div className={styles.line1}></div>
                      <p>FP076</p>
                    </div>
      
                    <p className={styles.top_p1}>
                      Nghiên cứu phát triển giống lúa mới chống chịu tác động của biến
                      đổi khí hậu và hạn chế sử dụng thuốc bảo vệ thực vật.
                    </p>
                  </div>
      
                  <div className={styles.mid}>
                    <img alt=">_<" src={ngoac}></img>
      
                    <p className={styles.mid_p1}>
                      Chị vừa nhận được giống lúa mới năm nay [2020]. Sau đó đem trồng
                      vào tháng 6 và thu hoạch vào tháng 11. Thực sự rất vui mừng vì
                      sản lượng tăng lên cao đồng thời cũng tiết kiệm chi phí mua
                      thuốc trừ sâu.
                    </p>
      
                    <p className={styles.mid_p2}>
                      Chị Trần Thị Thu Hà<br></br>Nông dân tại tỉnh Thừa Thiên Huế
                    </p>
                  </div>
  
                </div>
              </div>
          </div>
  
          <div className="col-12">
              <div className={styles.div2}>
                <div className={styles.div_left}>
                  <img alt=">_<" src={nguoiphunu}></img>
                </div>
      
                <div className={styles.div_right}>
                  <div className={styles.top}>
                    <div className={styles.part1}>
                      <div className={styles.line1}></div>
                      <p>FP076</p>
                    </div>
      
                    <p className={styles.top_p1}>
                      Nghiên cứu phát triển giống lúa mới chống chịu tác động của biến
                      đổi khí hậu và hạn chế sử dụng thuốc bảo vệ thực vật.
                    </p>
                  </div>
      
                  <div className={styles.mid}>
                    <img alt=">_<" src={ngoac}></img>
      
                    <p className={styles.mid_p1}>
                      Chị vừa nhận được giống lúa mới năm nay [2020]. Sau đó đem trồng
                      vào tháng 6 và thu hoạch vào tháng 11. Thực sự rất vui mừng vì
                      sản lượng tăng lên cao đồng thời cũng tiết kiệm chi phí mua
                      thuốc trừ sâu.
                    </p>
      
                    <p className={styles.mid_p2}>
                      Chị Trần Thị Thu Hà<br></br>Nông dân tại tỉnh Thừa Thiên Huế
                    </p>
                  </div>
                </div>
              </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default CoCauChuyen;

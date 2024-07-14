import CoGioiThieu from "./GioiThieu/GioiThieu.jsx";
import CoVeChungToi from "./VeChungToi/VeChungToi.jsx";
import CoThucTrang from "./ThucTrang/ThucTrang.jsx";
import ThucTrang2 from "./ThucTrang2/ThucTrang2.js";
import classNames from "classnames/bind";
import style from "./TrangChu.module.scss";


// import CoThucTrangVideo from "./ThucTrangVideo/ThucTrangVideo.jsx";

import CoSuMenh1 from "./SuMenh1/SuMenh1.jsx";
import CoSuMenh2 from "./SuMenh2/SuMenh2.jsx";
import CoSuMenh3 from "./SuMenh3/SuMenh3.jsx";
import CoThongTinMoi from "./ThongTinMoi/ThongTinMoi.jsx";
import Footer from "../../component/Footer/Footer.js";

const cx = classNames.bind(style);

function TrangChu() {
  return (
    <div>

        <CoGioiThieu />

        <CoVeChungToi />
        <CoThucTrang />

        <ThucTrang2 />

        {/* <CoThucTrangVideo /> */}

        <CoSuMenh1 />
        <CoSuMenh2 />
        <CoSuMenh3 />

        <CoThongTinMoi />

        <Footer />
    </div>
  );
}

export default TrangChu;

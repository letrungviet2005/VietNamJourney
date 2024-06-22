import CoGioiThieu from "./GioiThieu/GioiThieu.jsx";
import CoVeChungToi from "./VeChungToi/VeChungToi.jsx";
import CoThucTrang from "./ThucTrang/ThucTrang.jsx";

import CoThucTrangVideo from "./ThucTrangVideo/ThucTrangVideo.jsx";

import CoSuMenh1 from "./SuMenh1/SuMenh1.jsx";
import CoSuMenh2 from "./SuMenh2/SuMenh2.jsx";
import CoSuMenh3 from "./SuMenh3/SuMenh3.jsx";
import CoThongTinMoi from "./ThongTinMoi/ThongTinMoi.jsx";
import Footer from "../../component/Footer/Footer.js";



function TrangChu() {
    return (
        <div>
            <CoGioiThieu />

            <CoVeChungToi />
            <CoThucTrang />

            {/* <CoThucTrangVideo /> */}

            <CoSuMenh1 />
            <CoSuMenh2 />
            <CoSuMenh3 />

            <CoThongTinMoi />

            

        </div>
    );
}

export default TrangChu;
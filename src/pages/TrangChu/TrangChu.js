import CoVeChungToi from "./VeChungToi/VeChungToi.jsx";
import CoThucTrang from "./ThucTrang/ThucTrang.jsx";
import CoSuMenh1 from "./SuMenh1/SuMenh1.jsx";
import CoSuMenh2 from "./SuMenh2/SuMenh2.jsx";
import CoSuMenh3 from "./SuMenh3/SuMenh3.jsx";
import CoThongTinMoi from "./ThongTinMoi/ThongTinMoi.jsx";



function TrangChu() {
    return (
        <div>

            <CoVeChungToi />
            <CoThucTrang />

            <CoSuMenh1 />
            <CoSuMenh2 />
            <CoSuMenh3 />

            <CoThongTinMoi />

        </div>
    );
}

export default TrangChu;
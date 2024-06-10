import CoSuMenh2 from "./SuMenh2/SuMenh2.jsx";
import CoSuMenh3 from "./SuMenh3/SuMenh3.jsx";
import CoVeChungToi from "./VeChungToi/VeChungToi.jsx";
import CoThongTinMoi from "./ThongTinMoi/ThongTinMoi.jsx";



function TrangChu() {
    return (
        <div>

            <CoVeChungToi />


            <CoSuMenh2 />
            <CoSuMenh3 />

            <CoThongTinMoi />

        </div>
    );
}

export default TrangChu;
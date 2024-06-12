import OverView from "./components/OverView/OverView";
import classNames from "classnames/bind";
import style from './chiendich.module.scss';
import CampaignIng from "./components/CampaignIng/CampaignIng";
import CampaignEd from './components/CampaignEd/CampaignEd';
import CampaignWill from './components/CampaignWill/CampaignWill';
import Contact from "./components/Contact/Contact";
import PageDetail from "./page/PageDetail/PageDetail";

const cx = classNames.bind(style);

function ChienDich() {
    return (
        <div className={cx('container')}>
            {/* <OverView />
            <CampaignIng />
            <CampaignWill />
            <CampaignEd />
            <Contact /> */}
            <PageDetail 
            campId={'FP095'}
            desc={}
            imageUrl={'https://photo-cms-tpo.zadn.vn/Uploaded/2021/dr-ysleozyr/2021_04_23/image002-7267.jpeg'}
          />
        </div>
    );
}

export default ChienDich;
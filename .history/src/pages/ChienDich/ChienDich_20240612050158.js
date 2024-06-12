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
                imageUrl={''}
            />
        </div>
    );
}

export default ChienDich;
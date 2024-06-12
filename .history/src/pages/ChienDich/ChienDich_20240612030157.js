import OverView from "./components/OverView/OverView";
import classNames from "classnames/bind";
import style from './chiendich.module.scss';
import CampaignIng from "./components/CampaignIng/CampaignIng";
import CampaignEd from './components/CampaignEd/CampaignEd';
import CampaignWill from './components/CampaignWill/CampaignWill';

const cx = classNames.bind(style);

function ChienDich() {
    return (
        <div className={cx('container')}>
            <OverView />
            <CampaignIng />
            <CampaignWill />
            <CampaignEd />
        </div>
    );
}

export default ChienDich;
import OverView from "./components/OverView/OverView.js";
import classNames from "classnames/bind";
import style from './chiendich.module.scss';
import CampaignIng from "./components/CampaignIng/CampaignIng";

const cx = classNames.bind(style);

function ChienDich() {
    return (
        <div className={cx('container')}>
            <OverView />
            <CampaignIng />
        </div>
    );
}

export default ChienDich;
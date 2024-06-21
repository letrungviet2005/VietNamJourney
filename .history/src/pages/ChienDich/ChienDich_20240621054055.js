import OverView from "./components/OverView/OverView";
import classNames from "classnames/bind";
import style from './chiendich.module.scss';
import CampaignIng from "./components/CampaignIng/CampaignIng";
import CampaignEd from './components/CampaignEd/CampaignEd';
import CampaignWill from './components/CampaignWill/CampaignWill';
import Contact from "./components/Contact/Contact";
import PageDetail from "./page/PageDetail/PageDetail";

import { useState } from 'react';

const cx = classNames.bind(style);

function ChienDich() {
    const [province, setProvince] = useState('Đà Nẵng');

    const handleProvinceChange = (selectedProvince) => {
        setProvince(selectedProvince);
    };

    return (
        <div className={cx('container')}>
            <OverView />
            <CampaignIng province={province} />
            <CampaignWill />
            <CampaignEd />
            <Contact />
        </div>
    );
}

export default ChienDich;
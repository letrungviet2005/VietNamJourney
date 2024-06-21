import OverView from "./components/OverView/OverView";
import classNames from "classnames/bind";
import style from './chiendich.module.scss';
import CampaignIng from "./components/CampaignIng/CampaignIng";
import CampaignEd from './components/CampaignEd/CampaignEd';
import CampaignWill from './components/CampaignWill/CampaignWill';
import Contact from "./components/Contact/Contact";
import PageDetail from "./page/PageDetail/PageDetail";
import Footer from "../../component/Footer/Footer";

import { useState } from 'react';
import { useLocation } from 'react-router-dom';



const cx = classNames.bind(style);

function ChienDich() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const province = searchParams.get('province') || 'Đà Nẵng';

    return (
        <div className={cx('container')}>
            <OverView province={province} />
            <CampaignIng province={province} />
            <CampaignWill province={province}  />
            <CampaignEd province={province}  />
            <Contact />
        </div>
    );
}

export default ChienDich;
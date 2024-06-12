import classNames from "classnames/bind";
import style from './OverView.module.scss';
import Campaign from "../Campaign/Campaign";

const cx = classNames.bind(style);

function CampaignIng() {
  return (  
    <div className={cx('CampaignIng')}>
      <h2>Chiến dịch đang diễn ra</h2>
      <div className={cx('row')}>
        <Campaign />
      </div>
    </div>
  );
}

export default CampaignIng;
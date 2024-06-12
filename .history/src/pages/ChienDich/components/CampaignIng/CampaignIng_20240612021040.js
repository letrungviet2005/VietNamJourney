import classNames from "classnames/bind";
import style from './CampaignIng.module.scss';
import Campaign from "../Campaign/Campaign";

const cx = classNames.bind(style);

function CampaignIng() {
  return (  
    <div className={cx('CampaignIng')}>
      <h2>Chiến dịch đang diễn ra</h2>
      <div className={cx('row', '')}>
        <Campaign className={cx('col-4')} />
        <Campaign className={cx('col-4')} />
        <Campaign className={cx('col-4')} />
      </div>
    </div>
  );
}

export default CampaignIng;
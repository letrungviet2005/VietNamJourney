import classNames from "classnames/bind";
import style from './OverView.module.scss';

const cx = classNames.bind(style);

function CampaignIng() {
  return (  
    <div className={cx('CampaignIng')}>
      <h2>Chiến dịch đang diễn ra</h2>
      <div className={cx('row')}>

      </div>
    </div>
  );
}

export default CampaignIng;
import classNames from "classnames/bind";
import style from './CreateCampaign.module.scss';

const cx = classNames.bind(style);

function CreateCampaign() {
  return (  
    <div className={cx('CreateCampaign')}>
      <div >
        <div className={cx('ten-chien-dich')}>
          Tên chiến dịch
        </div>
      </div>

    </div>
  );
}

export default CreateCampaign;
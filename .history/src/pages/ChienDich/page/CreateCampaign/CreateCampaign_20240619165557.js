import classNames from "classnames/bind";
import style from './CreateCampaign.module.scss';

const cx = classNames.bind(style);

function CreateCampaign() {
  return (  
    <div className={cx('CreateCampaign')}>
      <div className={cx('row')}>
        <p>
          <div className={cx('ten-chien-dich')}>
            Tên chiến dịch
          </div>
        </p>
        <input type="text" className={cx('input-ten-chien-dich')} />
      </div>

    </div>
  );
}

export default CreateCampaign;
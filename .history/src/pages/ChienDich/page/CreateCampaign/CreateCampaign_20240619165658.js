import classNames from "classnames/bind";
import style from './CreateCampaign.module.scss';

const cx = classNames.bind(style);

function CreateCampaign() {
  return (  
    <div className={cx('CreateCampaign')}>
      <div className={cx('row')}>
        <div className={cx('col-2')}>
          <div className={cx('ten-chien-dich')}>Tên chiến dịch</div>
        </div>
        <div className={cx('col-10')}>
          <text type="text" className={cx('input-ten-chien-dich')} />
        </div>
      </div>

    </div>
  );
}

export default CreateCampaign;
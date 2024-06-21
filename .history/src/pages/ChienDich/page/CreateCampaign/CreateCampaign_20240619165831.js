import classNames from "classnames/bind";
import style from './CreateCampaign.module.scss';

const cx = classNames.bind(style);

function CreateCampaign() {
  return (  
    <div className={cx('CreateCampaign')}>
      <div className={cx('row')}>
        <div className={cx('col-2')}>
          <div className={cx('name')}>Tên chiến dịch</div>
        </div>
        <div className={cx('col-10')}>
          <textarea type="text" className={cx('input-name')} />
        </div>
      </div>
      <div className={cx('row')}>
        <div className={cx('col-2')}>
          <div className={cx('desc')}>Tên chiến dịch</div>
        </div>
        <div className={cx('col-10')}>
          <textarea type="text" className={cx('input-desc')} />
        </div>
      </div>

    </div>
  );
}

export default CreateCampaign;
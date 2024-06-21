import classNames from "classnames/bind";
import style from './CreateCampaign.module.scss';

const cx = classNames.bind(style);

function CreateCampaign() {
  return (  
    <div className={cx('CreateCampaign')}>
      <div className={cx('row')}>
        <div className={cx('col-2')}>
          <label className={cx('name')}>Tên chiến dịch</label>
        </div>
        <div className={cx('col-10')}>
          <textarea type="text" className={cx('input-name')} />
        </div>
      </div>
      <div className={cx('row')}>
        <div className={cx('col-2')}>
          <div className={cx('desc')}>Mô tả chiến dịch</div>
        </div>
        <div className={cx('col-10')}>
          <textarea type="text" className={cx('input-desc')} />
        </div>
      </div>
      <div className={cx('row')}>
        <div className={cx('col-2')}>
          <div className={cx('time')}>Ngày bắt đầu</div>
        </div>
        <div className={cx('col-10')}>
          <textarea type="text" className={cx('input-desc')} />
        </div>
      </div>


    </div>
  );
}

export default CreateCampaign;
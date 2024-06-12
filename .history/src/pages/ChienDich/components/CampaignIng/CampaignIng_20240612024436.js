import classNames from "classnames/bind";
import style from './CampaignIng.module.scss';
import Campaign from "../Campaign/Campaign";

const cx = classNames.bind(style);

function CampaignIng() {
  return (  
    <div className={cx('CampaignIng')}>
      <h2>Chiến dịch đang diễn ra</h2>
      <div className={cx('row', 'pad')}>
        <Campaign className={cx('col-4')} 
          campId={'FP056'}
          campType={'TÌNH NGUYỆN'}
          title={'HUYỆN VĨNH LINH'}
          desc={'Phát động trồng 5000 cây xanh trong mùa hè 2024'}
          imageUrl={'https://photo-cms-tpo.zadn.vn/Uploaded/2021/dr-ysleozyr/2021_04_23/image002-7267.jpeg'}
        />
        <Campaign className={cx('col-4')} 
          campId={''}
          campType={''}
          title={'HUYỆN VĨNH LINH'}
          desc={'Phát động trồng 5000 cây xanh trong mùa hè 2024'}
          imageUrl={'https://photo-cms-tpo.zadn.vn/Uploaded/2021/dr-ysleozyr/2021_04_23/image002-7267.jpeg'}
        />
        <Campaign className={cx('col-4')} 

        />
      </div>
    </div>
  );
}

export default CampaignIng;
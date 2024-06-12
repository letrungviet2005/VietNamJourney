import classNames from "classnames/bind";
import style from './TongQuan.module.scss';

const cx = classNames.bind(style);

function TongQuan() {
  return (  
    <div className={cx('TongQuan')}>
      <div className={cx('left')}>
        <div className={cx('inner')}>
          <p className={cx('title')}>TÌNH TRẠNG</p>
          <p className={cx('time')}>Đang diễn ra</p>
        </div>
        <div className={cx('inner')}>
          <p className={cx('title')}>NGÀY BẮT ĐẦU</p>
          <p className={cx('time')}>08/06/2024</p>
        </div>
        <div className={cx('inner')}>
          <p className={cx('title')}>NGÀY KẾT THÚC</p>
          <p className={cx('time')}>01/12/2024</p>
        </div>
        <div className={cx('inner')}>
          <p className={cx('title')}>ĐỊA ĐIỂM</p>
          <p className={cx('time')}>Huyện Triệu Phong</p>
        </div>
      </div>
      <div className={cx('right')}>
        <p>
        Dự án cung cấp các khoản vay và hỗ trợ kỹ thuật tại 17 quốc gia đang phát triển trên khắp Châu Phi, Châu Mỹ Latinh và Caribe để tạo ra các thị trường tự duy trì về hiệu quả năng lượng, năng lượng tái tạo và khả năng phục hồi khí hậu. 
        
        
        Mục tiêu chính của chương trình này là tăng quy mô tài chính khí hậu ở các quốc gia mục tiêu, chuyển hướng dòng tài chính và củng cố năng lực của các đối tác địa phương trong các lĩnh vực liên quan đến khí hậu. Nó sẽ thực hiện điều này bằng cách cung cấp các khoản vay thông qua các tổ chức tài chính đối tác địa phương cho người vay về năng lượng bền vững, hiệu quả năng lượng, nhà ở, nông nghiệp, lâm nghiệp, quản lý nước và chất thải. Nó cũng sẽ bao gồm một thành phần hỗ trợ kỹ thuật. 
        
        Chương trình này có ước tính sẽ kéo dài  20 năm.
        </p>
        <p>

        </p>
      </div>
    </div>
  );
}

export default TongQuan;